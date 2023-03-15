    // Settings for News API
    const [errorNews, setErrorNews] = useState(null);
    const [isLoadedNews, setIsLoadedNews] = useState(false);
    const [resultsNews, setResultsNews] = useState(null);
  
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
    fetch("https://newsapi.org/v2/everything?q=Weather%20in " + city + "&from=" + yesterday + "&units=metric" + "&apiKey=" + process.env.REACT_APP_WEATHERNEWSKEY)
      .then(res => res.json())
      .then(
        (result) => {
          if (result['cod'] !== 200) {
            // setIsLoaded(false)
            console.log(result)
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