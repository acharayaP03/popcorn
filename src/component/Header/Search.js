import React, { useEffect, useRef } from 'react';

export default function Search({ query, setQuery }) {
	const searchInputRef = useRef(null);

	useEffect(() => {
		function eventCallback(e) {
			if (document.activeElement === searchInputRef.current) return;
			if (e.code === 'Enter') {
				e.preventDefault();
				searchInputRef.current.focus();
				setQuery('');
			}
		}

		document.addEventListener('keydown', (e) => eventCallback);

		return () => {
			document.removeEventListener('keydown', (e) => eventCallback);
		};
	}, [setQuery]);

	return (
		<input
			ref={searchInputRef}
			className='search'
			type='text'
			placeholder='Search movies...'
			value={query}
			onChange={(e) => setQuery(e.target.value)}
		/>
	);
}
