import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import axios from '../axios';
import 'swiper/css/bundle';
import 'swiper/css';
import './Row.css';

SwiperCore.use([Navigation]);

function Row({ title, fetchURL, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);

  const base_url = 'https://image.tmdb.org/t/p/original/';

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => {
        const width = window.innerWidth;
        setWidth(width);
      },
      false
    );
  }, [width]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className='row__posters'>
        <Swiper
          navigation
          spaceBetween={0}
          breakpoints={{
            1450: {
              slidesPerView: 10,
              slidesPerGroup: 10,
            },
            1300: {
              slidesPerView: 7,
              slidesPerGroup: 7,
            },
            1100: {
              slidesPerView: 6,
              slidesPerGroup: 6,
            },
            920: {
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
            750: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            575: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            0: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
          }}>
          {movies.map(
            (movie, idx) =>
              ((isLargeRow && movie.poster_path) ||
                (!isLargeRow && movie.backdrop_path)) && (
                <SwiperSlide key={idx}>
                  <img
                    className={`row__poster ${
                      isLargeRow && 'row__posterLarge'
                    }`}
                    key={movie.id}
                    src={`${base_url}${movie.poster_path}`}
                    alt={movie.name}
                  />
                </SwiperSlide>
              )
          )}
        </Swiper>
      </div>
    </div>
  );
}

export default Row;
