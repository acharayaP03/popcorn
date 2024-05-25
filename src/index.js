
import React from "react";
import ReactDOM from "react-dom/client";

// import './index.css';
// import App from './App';
import StarRating from "./StarRating";
const rootElement = ReactDOM.createRoot(document.getElementById("root"));
rootElement.render(
    <React.StrictMode>
        <StarRating maxRating={5}/>
    </React.StrictMode>
)
