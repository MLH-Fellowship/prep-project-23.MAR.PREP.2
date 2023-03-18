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
                const {latitude, longitude} = position.coords;
                const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`);
                const data = await response.json();
                const result = data.results[0];
                if (result && result.address_components) {
                    const cityName = result.address_components.find((component) => component.types[0] === 'locality').long_name;
                    setCity(cityName);
                } else {
                    let City = require('country-state-city').City;
                    let json = City.getAllCities()
                    let closest_city = "";
                    let closest_lat = 100000000000000
                    let closest_long = 100000000000000
                    for (let x = 0; x < json.length; x++) {
                        if (Math.abs(latitude - json[x].latitude < closest_lat && Math.abs(longitude - json[x].longitude)) < closest_long) {
                            closest_lat = json[x].latitude;
                            closest_city = json[x].name;
                            closest_long = json[x].longitude;
                        }
                    }
                    setCity(closest_city);
                }
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
