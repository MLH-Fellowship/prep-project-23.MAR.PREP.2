import axios from 'axios'
import React, { useEffect, useState } from 'react'

const WeatherByHourData = (results) => {
    const [weatherData, setWeatherData] = useState([]);
    const [count, setCount] = useState(0)
    const timeOption = results.timeOption;
    const date = results.date.toISOString().slice(0, 10);
    const cityName = results.results.name;

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${process.env.REACT_APP_APIKEY}`)
            .then(res => {
                setWeatherData(res.data.list)
                setCount(count + 1)
            })
            .catch(err => {
                console.log(err.message)
            })


    }, [cityName, date, timeOption])

    useEffect(() => {
        checkChildForErrorMessage()
    }, [])


    const filterDataByDate = (date, timeOption) => {

        if (timeOption === "SelectTime" || timeOption === '') {
            return <div className='error-message'>
                <h1>Please select a time and date to get weather information</h1>
            </div>
        } 

        return weatherData.filter(data => data.dt_txt === `${date} ${timeOption}`).map(filteredData => {
            console.log(filteredData)
            return <div className="Specific-Results">
                <div className='weather-icon-container'>
                    <img src={`https://openweathermap.org/img/wn/${filteredData.weather[0].icon}@2x.png`} alt="weather icon" className='weather-icon'/>
                </div>
                <table>
                    <tr>
                        <th>Temperature</th>
                        <th>Humidity</th>
                        <th>Wind Speed</th>
                        <th>Outside</th>
                    </tr>
                    <tr>
                        <td>{filteredData.main.feels_like}°C</td>
                        <td>{filteredData.main.humidity}</td>
                        <td>{filteredData.wind.speed} mph</td>
                        <td>{filteredData.weather[0].main}</td>
                    </tr>
                </table>
                
                
            </div>
        })
    }

    // This method checks the dom to ensure that child, which is the name of the 
    // container that contains the weather data from the forecast api call is null
    // and if count is above 1, which it will increase whenever after the first api call is made.
    // This method is important because it will allow for the user to know that the data that they request is not
    // available due to the limitations of the API. 

    const checkChildForErrorMessage = (child) => {
        child = document.querySelector(".Specific-Results")
        if (child === null && count > 1) {
            return <h1 className='error-message'>Data not available</h1>
        }
    }

    return (
        <div className='component-window'>
            {filterDataByDate(date, timeOption)}
            {checkChildForErrorMessage()}
        </div>
    )
}

export default WeatherByHourData