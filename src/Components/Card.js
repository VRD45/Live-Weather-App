import React from 'react'
import { useState, useEffect } from 'react';

export const Card = () => {
    const[city,setCity] = useState(null);
    const[weather,setWeather] = useState(null);
    const[wind,setWind] = useState(null);
    const[search,setSearch] = useState('Mumbai');
    useEffect(()=>{
        const fetchApi = async () => {
            try{
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=05f21c2d93c910091fce8ec2d4113b81`;
            const response = await fetch(url);
            const resJson = await response.json();
            console.log(resJson);
            if(resJson){
                setCity(resJson.main);
                setWeather(resJson.weather);
                setWind(resJson.wind);
            }
        }catch(err){
            console.log(err);
        }
        };
        fetchApi();
    },[search])
    return (
        <div id="card">
            <div className="title">Live Weather Forecast</div>
            <input type="search" 
            placeholder="Search..."
            onChange={(e)=>{setSearch(e.target.value)}}
            />
            {(!city || !weather || !wind) ? (
            <p>No data Found</p>
            ):(
                <>
            <div className="city">{search}</div>
            <div className="temperature">
                <h2>{city.temp}<sup>°C</sup> </h2>
                <div className="weather">
                    <img src={"http://openweathermap.org/img/wn/"+weather[0].icon+".png"} alt="" />
                    {weather[0].main}
                </div>
                <div className="range">
                    <div className="min">min : {city.temp_min} °C</div>
                    |
                    <div className="max">max : {city.temp_max} °C</div>
                </div>
                <div className="humidity">
                    Humidity : {city.humidity}
                </div>
                <div className="pressure">
                    Pressure : {city.pressure}
                </div>
                <div className="wind">
                    Wind Speed : {wind.speed} m/s
                </div>
            </div>
            </>
            )}
            
        </div>
    )
}
