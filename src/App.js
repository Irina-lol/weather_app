import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const App = () => {
  const [city, setCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  const cities = [
    { value: "Moscow", label: "Москва" },
    { value: "Saint Petersburg", label: "Санкт-Петербург" },
    { value: "Novosibirsk", label: "Новосибирск" },
    { value: "Yekaterinburg", label: "Екатеринбург" },
  ];

  const fetchWeather = async (cityName) => {
    const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=ru`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric&lang=ru`;

    try {
      const weatherResponse = await axios.get(weatherUrl);
      const forecastResponse = await axios.get(forecastUrl);

      setWeatherData(weatherResponse.data);
      setForecastData(forecastResponse.data);
    } catch (error) {
      console.error("Ошибка при запросе данных:", error);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeather(city.value);
    }
  }, [city]);

  return (
    <div className="App">
      <h1>Погодный сервис</h1>
      <Select
        options={cities}
        onChange={setCity}
        placeholder="Выберите город"
      />

      {weatherData && (
        <div>
          <h2>Погода в {weatherData.name}</h2>
          <p>Температура: {weatherData.main.temp}°C</p>
          <p>Погода: {weatherData.weather[0].description}</p>
        </div>
      )}

      {forecastData && (
        <div>
          <h2>Прогноз на 5 дней</h2>
          {forecastData.list.slice(0, 5).map((item, index) => (
            <div key={index}>
              <p>Дата: {item.dt_txt}</p>
              <p>Температура: {item.main.temp}°C</p>
              <p>Погода: {item.weather[0].description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
