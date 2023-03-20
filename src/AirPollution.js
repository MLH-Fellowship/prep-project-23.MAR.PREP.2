import React, { useState, useEffect } from "react";
import './AirPollution.css'
import goodImage from './air pollution css/good.png';
import fairImage from './air pollution css/fair.png';
import moderateImage from './air pollution css/moderate.png';
import poorImage from './air pollution css/poor.png';
import veryPoorImage from './air pollution css/very-poor.png';
import noDataImage from './air pollution css/no-air-data.png';


function AirPollution(props) {
    console.log("Lat:", props.lat);
    console.log("Lon:", props.lon);
    const [isLoaded, setIsLoaded] = useState(false);
    const[airPollution, setAirPollution] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${props.lat}&lon=${props.lon}&appid=${process.env.REACT_APP_APIKEY}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setAirPollution(result);
                    console.log(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [props.lat, props.lon])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        let airQuality;
        console.log(airPollution);
        if (airPollution == null ) {
            return <h1> Loading ... </h1>;
        } else {
            airQuality = airPollution.list[0].main.aqi;
        }
        let pollutionImgSrc;
        let pollutionLevel;

        switch (airQuality) {
            case 1:
                pollutionImgSrc = goodImage;
                pollutionLevel = "Good";
                break;
            case 2:
                pollutionImgSrc = fairImage;
                pollutionLevel = "Fair";
                break;
            case 3:
                pollutionImgSrc = moderateImage;
                pollutionLevel = "Moderate";
                break;
            case 4:
                pollutionImgSrc = poorImage;
                pollutionLevel = "Poor";
                break;
            case 5:
                pollutionImgSrc = veryPoorImage;
                pollutionLevel = "Very Poor";
                break;
            default:
                pollutionImgSrc = noDataImage;
                pollutionLevel = "Not Found";
        }

        return (
            <div className='container'>
                <h2 className='h2_pollution'>Current Air Quality: {pollutionLevel} </h2>
                <img src={pollutionImgSrc} alt="The Air Quality Today Is: "/>
            </div>
        );

    }


}

export default AirPollution;