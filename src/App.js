import { useEffect, useState } from "react";
import WeatherByHourData from "./components/WeatherByHourData";
import './App.css';
import logo from './mlh-prep.png'
import Select from "react-select";

function App(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City")
  const [results, setResults] = useState(null);
  const [timeOption, setTimeOption] = useState("");
  const [date, setDate] = useState(null);
  
const currentDate = new Date();

let day = currentDate.getDate();
let month = currentDate.getMonth() + 1;
let year = currentDate.getFullYear();



  useEffect(() => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&appid=" + process.env.REACT_APP_APIKEY)
      .then(res => res.json())
      .then(
        (result) => {
          if (result['cod'] !== 200) {
            setIsLoaded(false)
          } else {
            setIsLoaded(true);
            setResults(result);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [city, timeOption, date])

  
  

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
          onChange={event => setCity(event.target.value)} />
          <input type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          />
          <select
          onChange={e => setTimeOption(e.target.value)}
          value={timeOption}
          >
            <option value="SelectTime">Select Time</option>
            <option value="03:00:00">3AM</option>
            <option value="06:00:00">6AM</option>
            <option value="09:00:00">9AM</option>
            <option value="12:00:00">12PM</option>
            <option value="15:00:00">1PM</option>
            <option value="18:00:00">4PM</option>
            <option value="21:00:00">7PM</option>
          </select>
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

      {results === null ? <div>
        <h1>Loading...</h1>
      </div> : <div>
      <WeatherByHourData results={results} date={date} timeOption={timeOption}/>
        </div>}

  
      
    </>
  }
}

export default App;
