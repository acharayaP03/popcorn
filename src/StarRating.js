
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
    return (
    <div style={containerStyle}>
        <div style={starContainerStyle}>
            { 
                Array.from({ length: maxRating }).map((_, i) => (
                    <Star key={i} onSetRating={() => setRating(i + 1)} starRating={rating >= i + 1}/>
                ))
            }
        </div>
        <p style={textStyle}>{rating || ''}</p>
    </div>
    )
}