export default function ErrorMessage({ message }) {
	return (
		<div className='error'>
			<span>🛑&nbsp;</span>
			{message}
		</div>
	);
}
