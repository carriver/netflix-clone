import React from 'react';
import Nav from '../components/Nav';
import Banner from '../components/Banner';
import Row from '../components/Row';
import requests from '../components/Requests';
import './HomeScreen.css';

function HomeScreen() {
  return (
    <div className='homeScreen'>
      <Nav />
      <Banner />

      <Row
        title='NETFLIX ORIGINALS'
        fetchURL={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title='Trending Now' fetchURL={requests.fetchTrending} />
      <Row title='Top Rated' fetchURL={requests.fetchTopRated} />
      <Row
        title="My Wife's Favorite Shows"
        fetchURL={requests.fetchSpanishSoapTV}
      />
      <Row title='Action Movies' fetchURL={requests.fetchActionMovies} />
      <Row title='Animation Movies' fetchURL={requests.fetchAnimationMovies} />
      <Row title='Comedy Movies' fetchURL={requests.fetchComedyMovies} />
      <Row title='Sci-Fi Movies' fetchURL={requests.fetchScifiMovies} />
      <Row title='Thriller Movies' fetchURL={requests.fetchThrillerMovies} />
      <br />
      <footer className='homeScreen__footer'>
        <h6>This website is powered by:</h6>
        <img
          src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg'
          alt='TMDB'
        />
      </footer>
    </div>
  );
}

export default HomeScreen;
