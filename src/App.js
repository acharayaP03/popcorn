import { useState } from "react";

import { tempMovieData, tempWatchedData } from "./data";
import Logo from "./component/Header/Logo";
import  Search  from "./component/Header/Search";
import SearchResults from "./component/Header/SearchResults";
import MovieList from "./component/MovieList/MoviesList";
import MoviesWatchedList from "./component/MovieList/MoviesWatchedList";
import Summary from "./component/MovieList/Summary";
import Navbar from "./layouts/Navbar";
import ListBox from "./layouts/ListBox";
import Main from "./layouts/Main";  
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
      <Navbar>
          <Logo />
          <Search />
          <SearchResults movies={movies} />
      </Navbar>

      <Main>
          <ListBox isOpen={isOpen1} setIsOpen={setIsOpen1} element={<MovieList movies={movies} setWatched={setWatched} watched={watched} />}/>
          <ListBox isOpen={isOpen2} setIsOpen={setIsOpen2} element={
            <>
              <Summary watched={watched} avgImdbRating={avgImdbRating} avgUserRating={avgUserRating} avgRuntime={avgRuntime} />
              <MoviesWatchedList watched={watched}/>
            </>
          }>
          </ListBox>
      </Main>
    </>
  );
}
