
// import React from 'react';
// import './Home.scss';

// const Card = ({ img }) => {
//   return <img className='card' src={img} alt="hj" />;
// };

// const Row = ({ title, arr = [{
//   img: "https://v3img.voot.com/v3Storage/assets/rockstar-1713966579764.jpg"
// }] }) => {
//   return (
//     <div className='row'>
//       <h2>{title}</h2>
//       <div>
//         {arr.map((item, index) => (
//           <Card key={index} img={item.img} />
//         ))}
//       </div>
//     </div>
//   );
// };

// const Home = () => {
//   return (
//     <section className="home">
//       <div className="banner"></div>
//       <Row title="Popular on Netflix" />
//     </section>
//   );
// };

// export default Home;




// 
import React, { useEffect, useState } from 'react';
import './Home.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import{BiPlay} from "react-icons/bi"
import {AiOutlinePlus} from  "react-icons/ai"
const apiKey = "6e925fa924abbf08bc974b546f17dfc2";
const baseUrl = "https://api.themoviedb.org/3";
const popular = "popular";
const upcoming = "upcoming";
const toprated = "top_rated";
const nowplaying = "now_playing";
const genreEndpoint = "genre/movie/list";
const imgurl = "https://image.tmdb.org/t/p/w500";

const Card = ({ img }) => {
  return <img className='card' src={img} alt="cover" />;
};

const Row = ({ title, arr = [] }) => {
  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className='cards-container'>
        {arr.map((item, index) => (
          <Card key={index} img={item.img} />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const [PopularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topratedMovies, setTopratedMovies] = useState([]);
  const [nowplayingMovies, setNowPlayingMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [popularData, upcomingData, topratedData, nowplayingData, genreData] = await Promise.all([
          axios.get(`${baseUrl}/movie/${popular}?api_key=${apiKey}`),
          axios.get(`${baseUrl}/movie/${upcoming}?api_key=${apiKey}`),
          axios.get(`${baseUrl}/movie/${toprated}?api_key=${apiKey}`),
          axios.get(`${baseUrl}/movie/${nowplaying}?api_key=${apiKey}`),
          axios.get(`${baseUrl}/${genreEndpoint}?api_key=${apiKey}`)
        ]);

        setPopularMovies(popularData.data.results.map(movie => ({
          img: `${imgurl}${movie.poster_path}`
        })));

        setUpcomingMovies(upcomingData.data.results.map(movie => ({
          img: `${imgurl}${movie.poster_path}`
        })));
        setTopratedMovies(topratedData.data.results.map(movie => ({
          img: `${imgurl}${movie.poster_path}`,
          title: movie.title,
          overview: movie.overview
        })));
        setNowPlayingMovies(nowplayingData.data.results.map(movie => ({
          img: `${imgurl}${movie.poster_path}`
        })));
        setGenres(genreData.data.genres);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="home">
      <div className="banner"
      style={{
        backgroundImage: topratedMovies.length > 0 ? `url(${imgurl}${topratedMovies[0].img})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '500px' // adjust height as needed
      }}
      
      >
{topratedMovies.length > 0 && (
          <>
            <h1>{topratedMovies[0].title}</h1>
            <p>{topratedMovies[0].overview}</p>
          </>
         
        )}

        {/* {topratedMovies.length > 0 && (
          <img src={`${imgurl}${topratedMovies[0].img}`} alt="banner" />
        )} */}

        <div><button>Play  <BiPlay/></button>
        <button>My List <AiOutlinePlus/></button>
        </div>
      </div>
      <Row title="Popular Movies" arr={PopularMovies} />
      <Row title="Upcoming Movies" arr={upcomingMovies} />
      <Row title="Top Rated Movies" arr={topratedMovies} />
      <Row title="Now Playing" arr={nowplayingMovies} />
      <div className="genreBox">
        {genres.map((genre) => (
          <Link key={genre.id} to={`/genre/${genre.id}`}>{genre.name}</Link>
        ))}
      </div>
    </section>
  );
};

export default Home;
