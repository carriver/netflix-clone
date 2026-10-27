import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { fetchTmdbResults } from '../fetchTmdbResults';
import Row from './Row';

vi.mock('../fetchTmdbResults', () => ({ fetchTmdbResults: vi.fn() }));
vi.mock('swiper/react', () => ({
  Swiper: ({ children }) => <div>{children}</div>,
  SwiperSlide: ({ children }) => <div>{children}</div>,
}));

describe('Row', () => {
  it('renders posters only for titles that have one, labeled by title or name', async () => {
    fetchTmdbResults.mockResolvedValue([
      { id: 1, title: 'A Movie', poster_path: '/movie.jpg' },
      { id: 2, name: 'A Show', poster_path: '/show.jpg' },
      { id: 3, title: 'No Poster', poster_path: null, backdrop_path: '/backdrop.jpg' },
    ]);
    render(<Row title='Trending Now' fetchURL='/trending' />);

    const posters = await screen.findAllByRole('img');
    expect(posters.map((poster) => poster.getAttribute('alt'))).toEqual(['A Movie', 'A Show']);
    expect(posters[0]).toHaveAttribute('src', 'https://image.tmdb.org/t/p/original//movie.jpg');
  });
});
