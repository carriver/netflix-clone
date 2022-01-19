import React from 'react';
import Banner from './Banner';
import Nav from './Nav';
import './HomeScreen.css';
import requests from './Requests';
import Row from './Row';

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
      <Row title='Action Movies' fetchURL={requests.fetchActionMovies} />
      <Row title='Animation Movies' fetchURL={requests.fetchAnimationMovies} />
      <Row title='Comedy Movies' fetchURL={requests.fetchComedyMovies} />
      <Row title='Sci-Fi Movies' fetchURL={requests.fetchScifiMovies} />
      <Row title='Thriller Movies' fetchURL={requests.fetchThrillerMovies} />
      <Row title='Documentaries' fetchURL={requests.fetchDocumentaryMovies} />
    </div>
  );
}

export default HomeScreen;
