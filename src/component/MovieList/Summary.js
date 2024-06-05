const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
export default function Summary({ watched }) {
	const fixedAvgImdbRating = function (item) {
		if (item <= 0) {
			return 0;
		} else {
			return new Intl.NumberFormat('en-US', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			}).format(item);
		}
	};

	const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
	const avgUserRating = average(watched.map((movie) => movie.userRating));
	const avgRuntime = average(watched.map((movie) => movie.runtime));
	return (
		<div className='summary'>
			<h2>Movies you watched</h2>
			<div>
				<p>
					<span>#️⃣</span>
					<span>{watched.length} movies</span>
				</p>
				<p>
					<span>⭐️</span>
					<span>{fixedAvgImdbRating(avgImdbRating)}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{fixedAvgImdbRating(avgUserRating)}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{avgRuntime} min</span>
				</p>
			</div>
		</div>
	);
}
