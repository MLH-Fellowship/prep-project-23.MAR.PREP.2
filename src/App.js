import React, { useEffect, useState } from "react";
import NewsArticles from "./componets/NewsArticles";
import "./App.css";
import logo from "./mlh-prep.png";
import Box from "./components/SuggestedThings/Box";
import AirPollution from "./AirPollution";
import Sun from "./Sun";
import MapComponent from "./map";
import ThemedBackground from "./components/theme/ThemedBackground";
import WeatherByHourData from "./components/WeatherByHourData";
import ExampleCustomTimeInput from "./components/ExampleCustomTimeInput";
import { addDays } from "date-fns";
import calendarIcon from "./images/55281.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function App(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City");
  const [results, setResults] = useState(null);
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [date, setDate] = useState(new Date());
  const arrayOfTimes = [
    "SelectTime",
    "00:00:00",
    "03:00:00",
    "06:00:00",
    "09:00:00",
    "12:00:00",
    "15:00:00",
    "18:00:00",
    "21:00:00",
  ];
  const [timeOption, setTimeOption] = useState(arrayOfTimes[0]);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          //This code uses the Haversine formula to calculate the distance between the user's location and each city in the citiesData array. The distances are stored in an array of objects with each object containing the name of the city and the distance from the user's location.
          // The Promise.all method is used to wait for all the distance calculations to complete before finding the closest city. The reduce method is used to find the city with the smallest distance, which is then set as the closest city.
          let City = require("country-state-city").City;
          let citiesData = City.getAllCities();
          const { latitude, longitude } = position.coords;
          const R = 6371e3; // Earth radius in meters
          const rad = (x) => (x * Math.PI) / 180;
          const distances = citiesData.map((city) => {
            const dLat = rad(city.latitude - latitude);
            const dLon = rad(city.longitude - longitude);
            const a =
              Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(rad(latitude)) *
                Math.cos(rad(city.latitude)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c;
            return { city: city.name, distance };
          });
          Promise.all(distances).then((results) => {
            const closestCity = results.reduce((prev, curr) =>
              prev.distance < curr.distance ? prev : curr
            ).city;
            setCity(closestCity);
          });
        },
        (error) => console.log(error)
      );
    }
  }, []);
  // This function is called when the user submits the form
  const handleCitySubmit = (event) => {
    event.preventDefault();
    setIsLoaded(false);
    setResults(null);
    // Fetch weather data from OpenWeatherMap API
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric" +
        "&appid=" +
        process.env.REACT_APP_APIKEY
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result["cod"] !== 200) {
            setIsLoaded(false);
          } else {
            setIsLoaded(true);
            setResults(result);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
        <div className="fill-height">
          <img className="logo" src={logo} alt="MLH Prep Logo"></img>
          <div className="Page">
            <h2>Enter a city below 👇</h2>
            <form onSubmit={handleCitySubmit}>
              <input
                type="text"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
            </form>
            <br />
            <span>
              <div className="date-picker-div">
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  showTimeInput
                  customTimeInput={
                    <ExampleCustomTimeInput
                      timeOption={timeOption}
                      setTimeOption={setTimeOption}
                      arrayOfTimes={arrayOfTimes}
                    />
                  }
                  minDate={new Date()}
                  maxDate={addDays(new Date(), 5)}
                />
              </div>
              <div className="pic-container">
                <img
                  src={calendarIcon}
                  alt="calendar icon"
                  className="calendarIcon"
                ></img>
              </div>
            </span>
            <div className="Results">
              {!isLoaded && <h2>Loading...</h2>}
              {isLoaded && results && (
                <>
                  <h3>{results.weather[0].main}</h3>
                  <p>Feels like {results.main.feels_like}°C</p>
                  <Sun
                    latitude={results.coord.lat}
                    longitude={results.coord.lon}
                    timezone={results.timezone}
                  />
                  <i>
                    <p>
                      {results.name}, {results.sys.country}
                    </p>
                  </i>
                </>
              )}
            </div>
            {results === null ? (
              <div>
                <h1>Loading...</h1>
              </div>
            ) : (
              <WeatherByHourData
                results={results}
                timeOption={timeOption}
                date={date}
              />
            )}
          </div>
          <div className="center">
            {!isLoaded && <h2>Loading...</h2>}
            {console.log(results)}
            {isLoaded && results && (
              <>
                <h3>{results.weather[0].main}</h3>
                <p>Feels like {results.main.feels_like}°C</p>
                <i>
                  <p>
                    {results.name}, {results.sys.country}
                  </p>
                </i>
              </>
            )}
          </div>
          <h2 className="suggested-things-heading">
            Things you need to carry 🎒
          </h2>
          {/* Displays the 'Box' component if results(API response) is not null.
          Here, the API response is passed as props to the Box component*/}
          {results == null ? (
            <div>
              <h2>Loading...</h2>
            </div>
          ) : (
            <div>
              <Box weather={results} />
            </div>
          )}
          <MapComponent
            searchedLocation={searchedLocation}
            searchedLocationName={city}
          />

          {results && (
            <ThemedBackground weatherCondition={results?.weather[0].main} />
          )}
        </div>
        <NewsArticles city={city} />
      </>
    );
  }
}

export default App;
