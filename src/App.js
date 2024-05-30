import { useEffect, useState } from 'react';

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

const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
const apiKey = '4fd8b060';
const searhTerm = 'iron man';
export default function App() {
	const controller = new AbortController();

	const [query, setQuery] = useState('');
	const [movies, setMovies] = useState([]);
	const [watched, setWatched] = useState([]);
	const [isOpen1, setIsOpen1] = useState(true);
	const [isOpen2, setIsOpen2] = useState(true);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [selectedId, setSelectedId] = useState(null);

	const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
	const avgUserRating = average(watched.map((movie) => movie.userRating));
	const avgRuntime = average(watched.map((movie) => movie.runtime));

	async function fetchMovies(query = searhTerm, abortRequest = {}) {
		try {
			setLoading(true);
			setError('');
			const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`, {
				...abortRequest,
			});

			if (!response.ok)
				throw new Error('Something went wrong while fetching movies... please try again later.');

			const data = await response.json();
			if (data.Response === 'False')
				throw new Error('Could not find any movies with that name... please try again.');

			setMovies(data.Search);
			setError('');
		} catch (error) {
			if (error.name !== 'AbortError') {
				console.log(error.message);
				setError(error.message);
			}
		} finally {
			setLoading(false);
		}
	}

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
	useEffect(() => {
		if (query.length < 3) {
			setMovies([]);
			setError('');
			return;
		}
		handleCloseMovie(); // close movie details when searching for a new movie
		fetchMovies(query, { signal: controller.signal });

		return () => {
			controller.abort(); // abort earlier request when a new one is made
		};
	}, [query]);

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
							<Summary
								watched={watched}
								avgImdbRating={avgImdbRating}
								avgUserRating={avgUserRating}
								avgRuntime={avgRuntime}
							/>
							<MoviesWatchedList watched={watched} removeWatchedMovie={handleDeleteWatcedMovie} />
						</>
					)}
				</ListBox>
			</Main>
		</>
	);
}
