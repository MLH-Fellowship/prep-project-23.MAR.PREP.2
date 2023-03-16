import React from 'react'
import { useEffect, useState } from "react";
import Weather from "./componets/Weather";
import NewsArticles from './componets/NewsArticles';

function App() {
  const [city, setCity] = React.useState("New York City")
  return (
    <>
      <Weather city={city} setCity={setCity} />
      <NewsArticles city={city} />
    </>
  )
}

export default App