import { useEffect, useState } from "react";
import "./App.css";
import { getMovieList, searchMovie } from "./api";

// color
// #1A120B
// #3C2A21
// #D5CEA3
// #E5E5CB

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="movie-wrapper" key={i}>
          <div className="movie-title">{movie.title}</div>
          <img
            className="movie-image"
            src={`${import.meta.env.VITE_REACT_APP_BASEIMGURL}/${
              movie.poster_path
            }`}
            alt={movie.title}></img>
          <div className="movie-date">{movie.release_date}</div>
          <div className="movie-rate">{movie.vote_average}</div>
        </div>
      );
    });
  };

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    }
    // console.log({ query: query });
  };

  return (
    <div className="App p-10">
      <h1 className="text-3xl font-bold first-letter:font-mono text-center">
        Movie API
      </h1>
      <input
        type="text"
        placeholder="cari judul"
        className="movie-search "
        onChange={({ target }) => search(target.value)}
      />
      <div className="movie-container">
        <PopularMovieList />
      </div>
    </div>
  );
};

export default App;
