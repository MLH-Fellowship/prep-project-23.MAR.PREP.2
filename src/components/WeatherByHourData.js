import axios from 'axios'
import React, { useEffect, useState } from 'react'

const WeatherByHourData = (results) => {
    const [weatherData, setWeatherData] = useState([])

    const timeOption = results.timeOption
    const date = results.date.toISOString().slice(0,10)
    const cityName = results.results.name

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${process.env.REACT_APP_APIKEY}`)
            .then(res => {
                setWeatherData(res.data.list)
                console.log(res)
            })
            .catch(err => {
                console.log(err.message)
            })


    }, [cityName, date, timeOption])

    

    

    const filterDataByDate = (date, timeOption) => {
        if (timeOption === "SelectTime" || timeOption === '') {
            return <div>
                <h1>Please select a time and date to get weather information</h1>
            </div>
        } 
        
        return weatherData.filter(data => data.dt_txt === `${date} ${timeOption}`).map(filteredData => {
            return <div className="Results">
                <h2>Date Selected</h2>
                <div className='weather-box'>
                <img src={`https://openweathermap.org/img/wn/${filteredData.weather[0].icon}@2x.png`} alt="weather icon"></img>
                <h3>{filteredData.main.feels_like}°C</h3>
                </div>
                <h2>{filteredData.weather[0].main}</h2>
                <div className='bottom-weather-box'>
                    <div>
                        <h2>Humidity</h2>
                        <h3>{filteredData.main.humidity}</h3>
                    </div>
                    <div>
                        <h2>Wind Speed</h2>
                        <h3>{filteredData.wind.speed}</h3>
                    </div>
                </div>
            </div>
        })
    }

    return (
        <div>
            {filterDataByDate(date, timeOption)}
        </div>
    )
}

export default WeatherByHourData