import "./style/App.scss";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";

function App() {
  const [data, setData] = useState();
  const [city, setCity] = useState("jerusalem");
  const [err, setErr] = useState();
  // const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    async function fetchData(city) {
      await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0f5e793d5d33c40006e95c9c82122380        `
      )
        .then((r) => r.json())
        .then((data) => {
          setData(data);
          if (data.cod === "404") {
            setErr(data.message);
          } else {
            setErr();
          }
        })
        .catch((e) => console.log(e));
    }

    fetchData(city);
  }, [city]);

  console.log(data);

  return (
    <div className="weaterApp">
      <NavBar setCity={setCity} err={err} setErr={setErr} />

      {data ? (
        <div className="weaterMain">
          <div
            className="weaterGrid"
            style={{
              backgroundImage: `url('./img/weater-images/${data.weather[0].icon}.jpg')`,
            }}
          >
            <div className="weaterGrid__big">
              <div className="weaterGrid__big--desc">
                <h2>{data.weather[0].description}</h2>
              </div>
              <div className="weaterGrid__big--info">
                <div className="weaterGrid__big--minMax">
                  <label>Day</label>
                  <p>{Math.round(data.main.temp_max)}&deg;</p>
                  <label>Night</label>
                  <p>{Math.round(data.main.temp_min)}&deg;</p>
                </div>
                <div className="weaterGrid__big--main">
                  <h1>{Math.round(data.main.temp)}&deg;</h1>
                  <h3>{data.name}</h3>
                </div>
                <div className="weaterGrid__big--icon">
                  <img
                    src={`./img/weater-icons/${data.weather[0].icon}.png`}
                    alt=""
                  />
                  <p>{data.weather[0].main}</p>
                </div>
                <div className="weaterGrid__big--feelsLike">
                  <label>Feels like</label>
                  <p>{Math.round(data.main.feels_like)}&deg;</p>
                </div>
              </div>
              {/* <div>Date</div> */}
            </div>

            <div className="weaterGrid__side">
              <div className="weaterGrid__side--info">
                <div className="weaterGrid__side--infoDiv">
                  <label>Humidity:</label>
                  <p> {data.main.humidity}%</p>
                </div>
                <div className="weaterGrid__side--infoDiv">
                  <label>Clouds:</label>
                  <p> {data.clouds.all}%</p>
                </div>
                <div className="weaterGrid__side--infoDiv">
                  <label>Wind speed:</label>
                  <p> {data.wind.speed} m/s</p>
                </div>
                <div className="weaterGrid__side--infoDiv">
                  <label>Wind direction:</label>
                  <p> {data.wind.deg}</p>
                </div>
                <div className="weaterGrid__side--infoDiv">
                  <label>Wind gust:</label>
                  <p> {data.wind.gust} m/s</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>no data</div>
      )}
    </div>
  );
}

export default App;
