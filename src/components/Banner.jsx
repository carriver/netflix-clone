import { useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect';
import requests from './Requests';
import { fetchTmdbResults } from '../fetchTmdbResults';
import './Banner.css';

const pickRandom = (items) => items[Math.floor(Math.random() * items.length)];

const truncateWithEllipsis = (text, maxLength) =>
  text?.length > maxLength ? text.slice(0, maxLength - 1) + '...' : text;

function Banner() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchTmdbResults(requests.fetchStreamingOriginals).then((results) => {
      if (results.length) setMovie(pickRandom(results));
    });
  }, []);

  return (
    <header
      className='banner'
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundImage: movie?.backdrop_path
          ? `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`
          : 'none',
      }}>
      <div className='banner__content'>
        <h1 className='banner__title'>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className='banner__buttons'>
          <button className='banner__button'>Play</button>
          <button className='banner__button'>My List</button>
        </div>
        <h1 className='banner__description'>
          <Typewriter
            options={{
              strings: truncateWithEllipsis(movie?.overview, 150),
              delay: 30,
              autoStart: true,
            }}
          />
        </h1>
      </div>
      <div className='banner--fadeBottom' />
    </header>
  );
}

export default Banner;
