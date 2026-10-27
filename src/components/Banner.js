import React, { useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect';
import requests from './Requests';
import { fetchTmdbResults } from '../fetchTmdbResults';
import './Banner.css';

const pickRandom = (items) => items[Math.floor(Math.random() * items.length)];

function Banner() {
  // Fetch data for one random movie from TMDB Database and
  // store it using a useState Hook
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchTmdbResults(requests.fetchNetflixOriginals).then((results) => {
      if (results.length) setMovie(pickRandom(results));
    });
  }, []);

  // Ellipsis Function
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + '...' : string;
  }

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
              strings: truncate(movie?.overview, 150),
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
