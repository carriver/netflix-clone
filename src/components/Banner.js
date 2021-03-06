import React, { useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect';
import requests from './Requests';
import axios from '../axios';
import './Banner.css';

function Banner() {
  // Fetch data for one random movie from TMDB Database and
  // store it using a useState Hook
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
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
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
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
