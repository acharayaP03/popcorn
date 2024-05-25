
import { useState } from "react"
import Star from "./component/MovieDetail/Star"
const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
}

const starContainerStyle = {   
    display: 'flex',
    gap: '4px'
}

const textStyle = {
    lineHeight: '1',
    margin: '0'
}
export default function StarRating({ maxRating}) {
    const [rating,setRating ] = useState(0);
    const [hoverRating, setHoverRating] = useState(0)
    

    function handleSetRating(rating) {
        setRating(rating)
    }
    return (
    <div style={containerStyle}>
        <div style={starContainerStyle}>
            { 
                Array.from({ length: maxRating }).map((_, i) => (
                    <Star 
                        key={i} onSetRating={() => handleSetRating(i + 1)} 
                        starRating={hoverRating ? hoverRating >= i +1 : rating >= i + 1}
                        onHoverIn={() => setHoverRating(i + 1)}
                        onHoverOut={() => setHoverRating(0)}
                    />
                ))
            }
        </div>
        <p style={textStyle}>{ hoverRating || rating || ''}</p>
    </div>
    )
}