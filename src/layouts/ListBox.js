import Button from '../component/globalUi/Button';
export default function ListBox({ children, isOpen, setIsOpen }) {
	return (
		<div className='box'>
			<Button isOpen={isOpen} setIsOpen={setIsOpen} />
			{isOpen && children}
		</div>
	);
}
