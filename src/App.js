import { useState } from 'react';
import { useFetchMovies } from './hooks/useFetchMovies';

import Logo from './component/Header/Logo';
import Search from './component/Header/Search';
import SearchResults from './component/Header/SearchResults';
import MovieList from './component/MovieList/MoviesList';
import MoviesWatchedList from './component/MovieList/MoviesWatchedList';
import Summary from './component/MovieList/Summary';
import Navbar from './layouts/Navbar';
import ListBox from './layouts/ListBox';
import Main from './layouts/Main';
import Loader from './component/globalUi/Loader';
import ErrorMessage from './component/globalUi/ErrorMessage';
import MovieDetails from './component/MovieDetail/MovieDetails';
import { useLocalStorage } from './hooks/useLocalStorage';

export default function App() {
	const [query, setQuery] = useState('');
	const [selectedId, setSelectedId] = useState(null);
	const { loading, error, movies } = useFetchMovies(query, handleCloseMovie);
	const [watched, setWatched] = useLocalStorage([], 'watched');

	const [isOpen1, setIsOpen1] = useState(true);
	const [isOpen2, setIsOpen2] = useState(true);

	function handleSelectMovie(id) {
		setSelectedId((selectedId) => (id === selectedId ? null : id));
	}

	function handleCloseMovie() {
		setSelectedId(null);
	}

	function handleWatchedMovies(movie) {
		setWatched((watched) => [...watched, movie]);
	}

	function handleDeleteWatcedMovie(id) {
		setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
	}

	return (
		<>
			<Navbar>
				<Logo />
				<Search query={query} setQuery={setQuery} />
				<SearchResults movies={movies} />
			</Navbar>

			<Main>
				<ListBox isOpen={isOpen1} setIsOpen={setIsOpen1}>
					{loading && <Loader />}
					{error && <ErrorMessage message={error} />}
					{!loading && !error && (
						<MovieList
							movies={movies}
							setWatched={setWatched}
							watched={watched}
							onSelectMovie={handleSelectMovie}
						/>
					)}
				</ListBox>
				<ListBox isOpen={isOpen2} setIsOpen={setIsOpen2}>
					{selectedId ? (
						<MovieDetails
							selectedId={selectedId}
							onCloseMovie={handleCloseMovie}
							onAddWatched={handleWatchedMovies}
							watched={watched}
						/>
					) : (
						<>
							<Summary watched={watched} />
							<MoviesWatchedList watched={watched} removeWatchedMovie={handleDeleteWatcedMovie} />
						</>
					)}
				</ListBox>
			</Main>
		</>
	);
}
