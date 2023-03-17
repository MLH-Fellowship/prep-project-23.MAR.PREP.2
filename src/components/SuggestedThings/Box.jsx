import React from "react";
import '../../../src/assets/css/Box.css';
import suggestedThings from './suggestedThings';

// This functions returns the individual suggested item image and name of a particular weather type.
function Item(props) {
    return (
        <div key={props.name} className="flex suggested-thing">
            <img className="icons" src={props.img} alt={props.alt} width="50" height="50"></img>
            <h3>{props.name}</h3>
        </div>
    );
}

//This function returns the container which holds the three suggested items of a particular weather type.
function Box(props){
    const weatherType = props.weather.weather[0].main
    return (
        <div className="flex suggested-things-box">
            {Object.keys(suggestedThings[weatherType]).map((item) => {
                return (
                    <Item
                    img={suggestedThings[weatherType][item]}
                    alt="Suggested thing images"
                    name={item}
                    />
                );
            })}
        </div>
    );
}

export default Box;