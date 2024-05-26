import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import StarRating from './StarRating';

function CustomRating() {
	const [movieRating, setMovieRating] = useState(0);

	return (
		<div>
			<StarRating maxRating={10} color='coral' size={30} onSetRating={setMovieRating} />
			<p>This movie is rated {movieRating} stars</p>
		</div>
	);
}
const rootElement = ReactDOM.createRoot(document.getElementById('root'));
rootElement.render(
	<React.StrictMode>
		{/* <StarRating maxRating={5} message={['Terrible', 'bad', 'Okay', 'Good', 'Amazing']}/>
        <StarRating color="red" size={24} className="test" defaultRating={3}/>
        <CustomRating /> */}

		<App />
	</React.StrictMode>,
);
