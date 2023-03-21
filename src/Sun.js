import React, { useEffect, useState } from "react";
import "./Sun.css";
import sunSVG from './sun.svg'

const Sun = ({ latitude, longitude, timezone }) => {
    const [sunrise, setSunrise] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [sunset, setSunset] = useState(null);

    useEffect(() => {
        fetchSunTimes(latitude, longitude);
    }, [latitude, longitude]);

    useEffect(() => {
        getCurrentTime();
        const intervalId = setInterval(getCurrentTime, 60000);
        return () => {
          clearInterval(intervalId);
        };
    }, [timezone]);

    // get current time in correct timezone
    const getCurrentTime = () => {
        const localTime = new Date();
        const adjustedTime = new Date(localTime.getTime() + (timezone * 1000));

        setCurrentTime(adjustedTime);
    };

    // get sunrise and sunset times from lat and long coords
    const fetchSunTimes = async (lat, lon) => {
        try {
            const response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`);
            const data = await response.json();
            const sunriseUTC = new Date(data.results.sunrise);
            const sunsetUTC = new Date(data.results.sunset);

            setSunrise(new Date(sunriseUTC.getTime() + (timezone * 1000)))
            setSunset(new Date(sunsetUTC.getTime() + (timezone * 1000)))
        } catch (error) {
            console.error(error);
        }
    };

    // returns percentage of the way sun should be along the sky or
    // bar that represents the sky
    const sunPosition = () => {
        if (!sunrise || !sunset) return 0;

        const dayLength = sunset - sunrise;
        const timeElapsed = currentTime - sunrise;
        const pos = timeElapsed / dayLength * 100;

        return pos;
    }

    // returns whether or not it is currently daytime
    const isDaytime = () => {
        if (!sunrise || !sunset) return false;
        return currentTime >= sunrise && currentTime <= sunset;
    }

    return (
        <div 
            className="sun-container"
            style={{
                background: isDaytime()
                ? 'linear-gradient(to bottom, #87ceeb, #ffffff)'
                : 'linear-gradient(to bottom, #000, #ffffff)',
            }}
        >
            {isDaytime() && (
                <img src={sunSVG} className="sun" style={{ left: `${sunPosition()}%`}} />
            )}

            <div className={`sunrise-sunset-info ${isDaytime() ? 'day' : 'night'}`}>
                <div>Time: {currentTime && currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                <div>Sunrise: {sunrise && sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                <div>Sunset: {sunset && sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
        </div>
    );
};

export default Sun;