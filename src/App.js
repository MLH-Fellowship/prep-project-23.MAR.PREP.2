import React, { useEffect, useState } from "react";
import NewsArticles from './componets/NewsArticles';
import "./App.css";
import logo from "./mlh-prep.png";
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

  // This function is called when the user submits the form
  const handleCitySubmit = (event) => {
    event.preventDefault();
    setIsLoaded(false);
    setResults(null);
    // Fetch weather data from OpenWeatherMap API
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_APIKEY}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result["cod"] !== 200) {
            setIsLoaded(false);
          } else {
            setIsLoaded(true);
            setResults(result);
            setSearchedLocation([result.coord.lat, result.coord.lon]); // Set the coordinates of the searched location
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };
  // If there's an error, log it to the console
  if (error) {
    console.error(error);
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
            {isLoaded && results && (
              <AirPollution lat={results.coord.lat} lon={results.coord.lon} />
            )}
          </div>
          <MapComponent
            searchedLocation={searchedLocation}
            searchedLocationName={city}
          />

          {results && (
            <ThemedBackground weatherCondition={results?.weather[0].main} />
          )}
        </div>
      <MapComponent searchedLocation={searchedLocation} />
      <NewsArticles city={city} />

    </>
    );
  }
}

export default App;