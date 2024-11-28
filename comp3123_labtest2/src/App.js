import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard.js';
import SearchBar from './SearchBar.js';
import './App.css';

const App = () => {
  const [city, setCity] = useState('Toronto');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = '0afb26540bd2b8826130d087d34376d9';
  const fetchWeather = async (cityName) => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      setError('');
    } catch (err) {
      setError('City not found');
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  return (
    <div className="App">
      <h1>Weather App</h1>
      <SearchBar setCity={setCity} />
      {error ? <p>{error}</p> : <WeatherCard data={weatherData} />}
    </div>
  );
};

export default App;
