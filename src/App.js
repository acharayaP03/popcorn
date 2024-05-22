import { useState } from "react";

import { tempMovieData, tempWatchedData } from "./data";
import Logo from "./component/Header/Logo";
import  Search  from "./component/Header/Search";
import SearchResults from "./component/Header/SearchResults";
import Button from "./component/globalUi/Button";
import MovieList from "./component/MovieList/MoviesList";
import MoviesWatchedList from "./component/MovieList/MoviesWatchedList";
import Summary from "./component/MovieList/Summary";
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {

  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <>
      <nav className="nav-bar">
        <Logo />
        <Search />
        <SearchResults movies={movies} />
      </nav>

      <main className="main">
        <div className="box">
          <Button isOpen={isOpen1} setIsOpen={setIsOpen1} />
          {isOpen1 && (
            <MovieList movies={movies} setWatched={setWatched} watched={watched} />
          )}
        </div>

        <div className="box">
        <Button isOpen={isOpen2} setIsOpen={setIsOpen2} />
          {isOpen2 && (
            <>
              <Summary watched={watched} avgImdbRating={avgImdbRating} avgUserRating={avgUserRating} avgRuntime={avgRuntime} />
              <MoviesWatchedList watched={watched}/>
            </>
          )}
        </div>
      </main>
    </>
  );
}
