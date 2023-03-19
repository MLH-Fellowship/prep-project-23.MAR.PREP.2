import { useEffect, useState } from "react";
import './App.css';
import logo from './mlh-prep.png'

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City")
  const [stateCode, setStateCode] = useState ("NY")
  const [country, setCountry] = useState ("USA")
  const [results, setResults] = useState(null);

  useEffect(() => {
    // console.log (`https://api.openweathermap.org/geo/1.0/direct?q=${city}&state=${stateCode}&country=${country}&limit=1&appid=${apiKey}`)
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&state=${stateCode}&country=${country}&limit=1&appid=${process.env.REACT_APP_APIKEY}`)
    
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
  }, [city, stateCode, country])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return <>
      <img className="logo" src={logo} alt="MLH Prep Logo"></img>
      <div>
        <h2>Enter a city and country below 👇</h2>
        <input
          type="text"
          value={`${city}, ${stateCode}, ${country}`}
          onChange={event => 
          setCity(event.target.value)} 
          />
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
