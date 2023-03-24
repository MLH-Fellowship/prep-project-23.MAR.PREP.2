import { useEffect, useState } from "react";
import "./App.css";
import logo from "./mlh-prep.png";

import ThemedBackground from "./components/theme/ThemedBackground";
import ThemeSelector from "./components/theme/javascript-jaguars-only/ThemeSelector";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City");
  const [results, setResults] = useState(null);

  // State for custom theme
  const [user, setUser] = useState(null);
  const [isThemeSelectorActive, setIsThemeSelectorActive] = useState(false);
  const [isThemeSelectorMinimized, setIsThemeSelectorMinimized] =
    useState(true);

  useEffect(() => {
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
  }, [city]);

  // Listen for secret theme selector activation
  useEffect(() => {
    let pressCount = 0;

    const handleKeyDown = (event) => {
      if (event.key !== "J") return;

      if (pressCount === 0) {
        pressCount += 1;

        let timeout = setTimeout(() => {
          pressCount = 0;
          clearTimeout(timeout);
        }, 1000);
      } else {
        pressCount = 0;
        setIsThemeSelectorActive(true);
        setIsThemeSelectorMinimized(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
        <img className="logo" src={logo} alt="MLH Prep Logo"></img>
        <div>
          <h2>Enter a city below 👇</h2>
          <input
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
          <div className="Results">
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
        </div>

        <ThemedBackground user={user} results={results} />
        <ThemeSelector
          setUser={setUser}
          isThemeSelectorActive={isThemeSelectorActive}
          isThemeSelectorMinimized={isThemeSelectorMinimized}
          setIsThemeSelectorMinimized={setIsThemeSelectorMinimized}
        />
      </>
    );
  }
}

export default App;
