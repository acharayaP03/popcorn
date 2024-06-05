import React, { useEffect, useRef } from 'react';
import { useKey } from '../../hooks/useKey';

export default function Search({ query, setQuery }) {
	const searchInputRef = useRef(null);
	useKey('Enter', function () {
		if (document.activeElement === searchInputRef.current) return;
		searchInputRef.current.focus();
		setQuery('');
	});
	useEffect(() => {
		function eventCallback(e) {
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
