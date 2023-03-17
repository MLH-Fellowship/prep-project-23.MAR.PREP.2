import { useEffect, useState } from "react";
import '../NewsArticles.css';
import NewsArticle from "./NewsArticle";
// Settings for News API
function NewsArticles({ city }) {
  const [errorNews, setErrorNews] = useState(null);
  const [isLoadedNews, setIsLoadedNews] = useState(false);
  const [resultsNews, setResultsNews] = useState(null);
  // const [city, setCity] = useState("New York City")
  const WeatherKeywords = [
    "rainfall", "snow", "heat", "weather", "rain",
    "cloud", "temperature", "overcast", "sunrise",
    "tornado", "sunset", "humidity", "cold", "heat",
    "wind", "cloudy", "heat wave", "fog", "breeze", "humid",
    "blustery", "thunder", "heat index", "thunderstorm",
    "drought", "tropical", "water cycle", "temperate",
    "moisture", "drizzle", "warm", "dry", "hail", "icicle", "climate", "storm",
    "frosty", "dew point", "drought", "flood", "muggy", "gale", "flash flood",
    "atmosphere", "weather forecast", "weather report", "weather station",
    "cold front", "warm front", "weather map", "weather satellite",
    "mist", "weather balloon", "weather vane", "weather radar",
    "isobar", "cold snap", "condensation", "forecast", "ice storm",
    "freeze", "barometric", "gust", "snowfall", "snowstorm", "snowdrift",
    "whirlwind", "hurricane", "tornado", "cyclone", "air", "balmy", "avalanche",
    "barometer", "blizzard", "chill", "cloudburst", "damp",
    "air pressure", "frost", "spring", "smog", "ozone", "fall",
    "winter", "summer", "storm surge", "rain gage",
    "low pressure", "high pressure", "barometric pressure",
    "wind chill", "sleet", "sky", "dew", "surge", "monsoon",
    "permafrost"
  ];

  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 2)

  // console.log(yesterday)
  // console.log(today)

  // Fetching data From News API
  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  function containsWeatherKeyword(article) {
    const title = article.title.toLowerCase();
    return WeatherKeywords.some(keyword => title.includes(keyword));
  }


  // weatherArticles.forEach(article => {
  //   if (containsWeatherKeyword(article.description)) {
  //     console.log(`${article.title} contains weather keywords`);
  //   }
  // });


  // console.log(formatDate(yesterday));

  useEffect(() => {
    fetch("https://newsapi.org/v2/everything?q=Weather%20in " + city + "&from=" + formatDate(yesterday) + "&units=metric" + "&apiKey=" + process.env.REACT_APP_WEATHERNEWSKEY)
      .then(res => res.json())
      .then(
        (result) => {
          if (result['cod'] !== 200) {
            const articles = Object.values(result.articles).slice(0, 4);
            const filteredArticles = articles.filter(article => containsWeatherKeyword(article));
            setResultsNews(filteredArticles);
          } else {
            // setIsLoaded(true);
            // setResults(result);
            // console.log(result)
          }
        },
        (error) => {
          // setIsLoaded(true);
          // setError(error);
          // console.log(error)
        }
      )
  }, [city])

  // console.log("This is waht", resultsNews);

  return (
    <>
      <div className="NewsArticles">
        <h2>News Articles in {city}</h2>
        <div className="article-layout" >
          {resultsNews &&
            resultsNews.map((article, index) => (
              <NewsArticle key={index} article={article} />
            ))
          }
        </div>
      </div>
    </>
  )
}
export default NewsArticles;