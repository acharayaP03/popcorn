import WatchedMovies from "./WatchedMovies";

export default function MoviesWatchedList({ watched }) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovies movie={movie} key={movie.imdbID} />
            ))}
        </ul>
    )
}