import { useEffect, useState, useRef } from 'react';
import StarRating from './StarRating';
import Loader from '../globalUi/Loader';

const apiKey = '4fd8b060';
export default function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
	const [movieDetails, setMovieDetails] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [userRating, setUserRating] = useState('');

	const countRef = useRef(0);

	const hasAlreadyWatched = watched.some((movie) => movie.imdbID === selectedId);
	const watchedUserRating = watched.find((movie) => movie.imdbID === selectedId)?.userRating;

	const {
		Title: title,
		Released: released,
		Poster: poster,
		Runtime: runtime,
		Genre: genre,
		Plot: plot,
		Director: director,
		Actors: actors,
		imdbRating,
		BoxOffice: boxOffice,
	} = movieDetails;

	const handleAddWatchList = () => {
		const newWatchedMovie = {
			imdbID: selectedId,
			title,
			poster,
			imdbRating: Number(imdbRating),
			runtime: Number(runtime.split(' ')[0]),
			userRating,
			countRatingDecisions: countRef.current,
		};

		onAddWatched(newWatchedMovie);
		onCloseMovie();
	};

	useEffect(function () {
		if (userRating) countRef++;
	}, []);

	useEffect(() => {
		const getMovieDetails = async () => {
			try {
				setLoading(true);
				setError('');
				const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${selectedId}`);
				if (!response.ok) {
					throw new Error(
						'Something went wrong while fetching movie details... please try again later.',
					);
				}
				const data = await response.json();
				if (data.Response === 'False') {
					throw new Error('Could not find any movie with that ID... please try again.');
				}
				setMovieDetails(data);
			} catch (error) {
				console.error(error.message);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};
		getMovieDetails();
	}, [selectedId]);

	useEffect(() => {
		if (!title) return;
		document.title = `Movie | ${title}`;

		// clean up effect
		return () => {
			document.title = 'popcorn';
		};
	}, [title]);

	useEffect(() => {
		const callback = (event) => {
			if (event.key === 'Escape') {
				onCloseMovie();
			}
		};
		document.addEventListener('keydown', callback);
		return () => {
			document.removeEventListener('keydown', callback);
		};
	}, [onCloseMovie]);
	return (
		<div className='details'>
			{loading && <Loader />}
			{error && <p>{error}</p>}

			{!loading && !error && (
				<>
					<header>
						<button className='btn-back' onClick={onCloseMovie}>
							&larr;
						</button>
						<img src={poster} alt={`${title} poster`} />
						<div className='details-overview'>
							<h2>{title}</h2>
							<p>
								<span>
									🗓&nbsp;{released}&bull;⏱&nbsp;{runtime}
								</span>
								<span></span>
							</p>
							<p>
								<span>🎭&nbsp;{genre}</span>
							</p>
							<p>
								<span>⭐️</span>
								<span>{imdbRating} IMDb rating</span>
							</p>

							<p>
								<span>🍿</span>
								<span>{boxOffice}</span>
							</p>
						</div>
					</header>
					<section>
						<div className='rating'>
							{hasAlreadyWatched && (
								<p className='watched'>
									You already watched this movie and rated {watchedUserRating} ⭐️
								</p>
							)}
							{!hasAlreadyWatched && (
								<>
									<StarRating maxRating={10} size={24} onSetRating={setUserRating} />
									{userRating > 0 && (
										<button className='btn-add' onClick={handleAddWatchList}>
											+ Add to watchlist
										</button>
									)}
								</>
							)}
						</div>
						<p>
							<em>{plot}</em>
						</p>
						<p>
							<strong>🎬 Director:</strong> {director}
						</p>
						<p>🕴️ Starring {actors}</p>
					</section>
				</>
			)}
		</div>
	);
}
