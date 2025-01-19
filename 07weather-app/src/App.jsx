import { useState } from "react";
import "./App.css";
import { FaTemperatureThreeQuarters } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import Navbar from "./components/Navbar";
const API_KEY = import.meta.env.VITE_API_KEY;
import weatherLogo from "./assets/weather-app-new-logo.png";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateCityName = (city) => {
    const regex = /^[a-zA-Z\s]+$/; // Letters and spaces only
    return regex.test(city);
  };

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }
    if (!validateCityName(city)) {
      setError("City name can only contain letters and spaces.");
    } else {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("City not found");
        }
        const data = await response.json();
        setWeather(data);
        setError("");
        setCity("");
      } catch (err) {
        setError(err.message);
        setWeather(null);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-400 to-purple-600 text-white p-4">
        <div className="flex justify-center mb-4">
          <img
            className="w-1/4 md:w-1/6"
            src={weatherLogo}
            alt="Logo"
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Weather App</h1>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full max-w-md">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-4 py-2 rounded-md shadow-md text-black focus:outline-none w-full"
            aria-label="City Name Input"
          />
          <button
            onClick={fetchWeather}
            disabled={city.length < 3}
            className={`px-4 py-2 rounded-md shadow-md focus:outline-none w-full md:w-auto ${
              city.length < 3
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
            aria-label="Search Weather"
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </div>
        {error && <p className="text-red-700 mt-4">{error}</p>}
        {weather && (
          <div className="mt-6 p-6 bg-white bg-opacity-20 rounded-lg shadow-lg backdrop-blur-md w-full max-w-md">
            <h2 className="text-2xl font-semibold text-center">
              {weather.name}
            </h2>
            <p className="capitalize text-center">
              {weather.weather[0].description}
            </p>
            <div className="flex justify-between items-center text-lg mt-4">
              <span className="flex items-center">
                Temperature <FaTemperatureThreeQuarters className="ml-1" />:{" "}
                {weather.main.temp}°C
              </span>
            </div>
            <div className="flex justify-between items-center text-lg mt-2">
              <span className="flex items-center">
                Humidity <WiHumidity className="ml-1" />:{" "}
                {weather.main.humidity}%
              </span>
            </div>
            <div className="flex justify-between items-center text-lg mt-2">
              <span className="flex items-center">
                Wind Speed <FaWind className="ml-1" />: {weather.wind.speed} m/s
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
