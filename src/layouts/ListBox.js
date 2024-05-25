
import Button from "../component/globalUi/Button"
export default function ListBox({ element, isOpen, setIsOpen }) {
    return (
        <div className="box">
            <Button isOpen={isOpen} setIsOpen={setIsOpen} />
            {isOpen && element}
        </div>
    )
}