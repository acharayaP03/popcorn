

import { useState } from "react";
import Movies from "./Movies";

export default function MovieList({ movies }) {

    return (
        <ul className="list">
            {movies?.map((movie) => (
                <Movies movie={movie} key={movie.imdbID} />
            ))}
        </ul>
    )
}