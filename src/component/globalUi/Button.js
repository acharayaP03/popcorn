

export default function Button({ isOpen, setIsOpen}) {

    function handleOpen() {
        setIsOpen((open) => !open);
    }
    return (
        <button
            className="btn-toggle"
            onClick={handleOpen}
          >
            {isOpen ? "–" : "+"}
          </button>
    )
}