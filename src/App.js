import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@material-tailwind/react";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=55b51072b66b433caec183108231910&q=${location}&days=4&aqi=yes&alerts=yes`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const btnClick = () => {
    if (location) {
      fetchData();
      setLocation("");
    }
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className="gradient flex items-center justify-center flex-col gap-11">
      <h1 className="text-5xl py-3 font-extrabold text-white">Weather App</h1>
      <div className="flex flex-col gap-3 md:flex-row w-full md:w-1/2">
        <div className="w-full md:w-3/4">
          <Input
            color="white"
            label="Enter City"
            value={location}
            onChange={handleLocationChange}
          />
        </div>
        <button
          onClick={btnClick}
          className="border text-gray-50 duration-300 relative group cursor-pointer overflow-hidden h-10 w-full md:w-1/4 rounded-md bg-neutral-800 p-2 font-extrabold hover:bg-sky-700"
        >
          <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150 duration-700 right-12 top-12 bg-yellow-500"></div>
          <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-12 h-12 rounded-full group-hover:scale-150 duration-700 right-20 -top-6 bg-orange-500"></div>
          <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-8 h-8 rounded-full group-hover:scale-150 duration-700 right-32 top-6 bg-pink-500"></div>
          <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-4 h-4 rounded-full group-hover:scale-150 duration-700 right-2 top-12 bg-red-600"></div>
          <p className="z-10 absolute bottom-2 left-2">Get Weather</p>
        </button>
      </div>

      {weatherData && (
        <div className="flex flex-col md:flex-row justify-center items-center gap-5">
          {weatherData.forecast.forecastday.map((day) => (
            <div
              className="p-8 flex flex-col justify-center items-center gap-3 border rounded-lg"
              key={day.date}
            >
              <h2 className="font-extrabold text-3xl text-white">{day.date}</h2>
              <img
                className=""
                src={day.day.condition.icon}
                alt={day.day.condition.text}
              />
              <p className="text-white font-bold text-xl">{day.day.avgtemp_c} C</p>
              <p className="text-white font-bold text-xl">{day.day.condition.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

