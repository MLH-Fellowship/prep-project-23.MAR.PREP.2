import { useEffect, useState } from "react";
import '../NewsArticles.css';
// Settings for News API
function NewsArticles( {city} ) {
    const [errorNews, setErrorNews] = useState(null);
    const [isLoadedNews, setIsLoadedNews] = useState(false);
    const [resultsNews, setResultsNews] = useState(null);
    // const [city, setCity] = useState("New York City")

  
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
  
    console.log(yesterday)
    console.log(today)

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
 
console.log(formatDate(yesterday));

  useEffect(() => {
    fetch("https://newsapi.org/v2/everything?q=Weather%20in " + city + "&from=" + formatDate(yesterday) + "&units=metric" + "&apiKey=" + process.env.REACT_APP_WEATHERNEWSKEY)
      .then(res => res.json())
      .then(
        (result) => {
          if (result['cod'] !== 200) {
            // setIsLoaded(false)
            setResultsNews(Object.values(result.articles).slice(0, 4));
          } else {
            // setIsLoaded(true);
            // setResults(result);
            console.log(result)
          }
        },
        (error) => {
          // setIsLoaded(true);
          // setError(error);
          console.log(error)
        }
      )
  }, [city])

  console.log("This is waht", resultsNews);

  return (
    <>
    <div className="NewsArticles">
      <h2>News Articles in {city}</h2>
      <div>
      {resultsNews &&
          resultsNews.map((article, index) => (
            <div key={index}>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <p>By {article.author}</p>
            </div>
          ))
        }                                 
      
      </div>
    
  </div>
  </>
  )
}
export default NewsArticles;