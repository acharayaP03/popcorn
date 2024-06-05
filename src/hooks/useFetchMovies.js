import { useState, useEffect } from 'react';

const apiKey = '4fd8b060';
const searhTerm = 'iron man';
export function useFetchMovies(query, callback) {
	const controller = new AbortController();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [movies, setMovies] = useState([]);
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
	useEffect(() => {
		callback?.(); // callback function to be called after fetching movies
		if (query.length < 3) {
			setMovies([]);
			setError('');
			return;
		}
		// handleCloseMovie(); // close movie details when searching for a new movie
		fetchMovies(query, { signal: controller.signal });

		return () => {
			controller.abort(); // abort earlier request when a new one is made
		};
	}, [query]);
	return {
		loading,
		error,
		movies,
	};
}
