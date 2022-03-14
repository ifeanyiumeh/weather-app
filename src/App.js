/* eslint-disable array-callback-return */
import { useState } from "react";
import "./App.css";

const api = {
  key: "cc67e29c72ce022d5d2e962c06bc92c6",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const [weatherForecast, setWeatherForecast] = useState({});

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleSearch = (e) => {
    search(e);
    searchForecast(e);
  };

  const search = (e) => {
    if (e.key === "Enter" && query) {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
        })
        .catch((e) => {
          console.error("ERROR", e.message);
        });
    }
  };

  const searchForecast = (e) => {
    if (e.key === "Enter" && query) {
      fetch(`${api.base}forecast?q=${query}&units=metric&appid=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeatherForecast(result);
          setQuery("");
        })
        .catch((e) => {
          console.error("ERROR", e.message);
        });
    }
  };

  const dateFabricator = (d) => {
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const getClassName = () => {
    let className = "App";
    if (typeof weather.main != "undefined") {
      if (weather.main.temp > 10) {
        className += " warm";
      } else if (weather.main.temp <= -3) {
        className += " cold";
      }
    }

    return className;
  };

  return (
    <div className={getClassName()}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search Location..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={handleSearch}
          />
        </div>
        {weather.main ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateFabricator(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">
                {weather.weather[0].description.toUpperCase()}
              </div>
            </div>

            <div>
              {weatherForecast?.list?.map(
                (
                  { main: { temp, humidity }, dt_txt, weather: [{ icon }] },
                  index
                ) => {
                  const weatherDivision = [0, 8, 16, 24, 32, 40];

                  if (weatherDivision.includes(index)) {
                    return (
                      <div className="forecast" key={index}>
                        <div className="item">
                          <p>{days[new Date(dt_txt).getDay()]}</p>
                          <p>{Math.round(temp)}°c</p>
                          <br />
                          <br />
                          <p>Humidity</p>
                          <p>{Math.round(humidity)}%</p>
                          <br />

                          <img
                            alt="icon"
                            src={`https://openweathermap.org/img/w/${icon}.png`}
                            width="100"
                            height="100"
                          />
                        </div>
                      </div>
                    );
                  }
                }
              )}
            </div>
          </div>
        ) : (
          <div className="error-box">
            {weather.cod && (
              <p>{weather.message} for the location you entered</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
