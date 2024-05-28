import WatchedMovies from './WatchedMovies';

export default function MoviesWatchedList({ watched, removeWatchedMovie }) {
	return (
		<ul className='list'>
			{watched.map((movie) => (
				<WatchedMovies movie={movie} key={movie.imdbID} removeWatchedMovie={removeWatchedMovie} />
			))}
		</ul>
	);
}
