import {useEffect, useState} from "react";
import './App.css';
import logo from './mlh-prep.png'
import city from "city";

function App() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [city, setCity] = useState("New York City")
    const [results, setResults] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                //This code uses the Haversine formula to calculate the distance between the user's location and each city in the citiesData array. The distances are stored in an array of objects with each object containing the name of the city and the distance from the user's location.
                // The Promise.all method is used to wait for all the distance calculations to complete before finding the closest city. The reduce method is used to find the city with the smallest distance, which is then set as the closest city.
                let City = require('country-state-city').City;
                const {latitude, longitude} = position.coords;
                const R = 6371e3; // Earth radius in meters
                const rad = (x) => (x * Math.PI) / 180;
                const distances = citiesData.map((city) => {
                    const dLat = rad(city.latitude - latitude);
                    const dLon = rad(city.longitude - longitude);
                    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(latitude)) * Math.cos(rad(city.latitude)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
                    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    const distance = R * c;
                    return {city: city.name, distance};
                });
                Promise.all(distances).then((results) => {
                    const closestCity = results.reduce((prev, curr) => prev.distance < curr.distance ? prev : curr).city;
                    setCity(closestCity);
                });
            }, (error) => console.log(error));
        }
    }, [])
    useEffect(() => {

        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&appid=" + process.env.REACT_APP_APIKEY)
            .then(res => res.json())
            .then((result) => {
                if (result['cod'] !== 200) {
                    setIsLoaded(false)
                } else {
                    setIsLoaded(true);
                    setResults(result);
                }
            }, (error) => {
                setIsLoaded(true);
                setError(error);
            })
    }, [city])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return <>
            <img className="logo" src={logo} alt="MLH Prep Logo"></img>
            <div>
                <h2>Enter a city below 👇</h2>
                <input
                    type="text"
                    value={city}
                    onChange={event => setCity(event.target.value)}/>
                <div className="Results">
                    {!isLoaded && <h2>Loading...</h2>}
                    {console.log(results)}
                    {isLoaded && results && <>
                        <h3>{results.weather[0].main}</h3>
                        <p>Feels like {results.main.feels_like}°C</p>
                        <i><p>{results.name}, {results.sys.country}</p></i>
                    </>}
                </div>
            </div>
        </>
    }
}

export default App;
