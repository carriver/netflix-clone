import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchTmdbResults } from '../fetchTmdbResults';
import Banner from './Banner';

vi.mock('../fetchTmdbResults', () => ({ fetchTmdbResults: vi.fn() }));
vi.mock('typewriter-effect', () => ({ default: ({ options }) => <p>{options.strings}</p> }));

const originals = [
  { name: 'First Show', backdrop_path: '/first.jpg', overview: 'First overview' },
  { name: 'Last Show', backdrop_path: '/last.jpg', overview: 'Last overview' },
];

describe('Banner', () => {
  afterEach(() => vi.restoreAllMocks());

  it('features the first result when the random pick is at the low end', async () => {
    fetchTmdbResults.mockResolvedValue(originals);
    vi.spyOn(Math, 'random').mockReturnValue(0);
    render(<Banner />);

    expect(await screen.findByRole('heading', { name: 'First Show' })).toBeInTheDocument();
  });

  it('features the last result when the random pick is at the high end', async () => {
    fetchTmdbResults.mockResolvedValue(originals);
    vi.spyOn(Math, 'random').mockReturnValue(0.999);
    render(<Banner />);

    expect(await screen.findByRole('heading', { name: 'Last Show' })).toBeInTheDocument();
  });

  it('shows no backdrop image until a movie has loaded', () => {
    fetchTmdbResults.mockReturnValue(new Promise(() => {}));
    const { container } = render(<Banner />);

    expect(container.querySelector('.banner').style.backgroundImage).toBe('none');
  });
});
