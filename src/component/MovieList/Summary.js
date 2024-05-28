export default function Summary({ watched, avgImdbRating, avgUserRating, avgRuntime }) {
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
