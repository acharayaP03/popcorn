import { useEffect, useState } from 'react';
import StarRating from './StarRating';
import Loader from '../globalUi/Loader';

const apiKey = '4fd8b060';
export default function MovieDetails({ selectedId, onCloseMovie }) {
	const [movieDetails, setMovieDetails] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
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
	} = movieDetails;

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
								<span>👥</span>
								<span>{actors}</span>
							</p>
							<p>
								<span>⭐️</span>
								<span>{imdbRating} IMDb rating</span>
							</p>
						</div>
					</header>
					<section>
						<div className='rating'>
							<StarRating maxRating={10} size={24} />
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
