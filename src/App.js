import sunnybg from "./assets/sunny.jpeg";
import snowbg from "./assets/snow.jpg";
import Description from "./components/Description";
import { useEffect ,useState } from "react";
import { getFormattedWeatherData } from "./waetherservice";

function App() {
  const[City ,setCity]= useState("Paris")
  const [weather, setWeather]=useState(null);
  const[units ,setUnits] = useState("metric")
  const[bg,setBg]= useState(sunnybg)

useEffect(() =>{
const fetchWeatherData = async() => {
  const data = await getFormattedWeatherData(City,units);
  setWeather(data)
//dynamic Backgroung
const threshold = units === 'metric' ? 20:60;
if(data.temp <= threshold) setBg (snowbg)
else setBg (sunnybg);
};
fetchWeatherData();

},[units ,  City]);

const handleUnitsClick = (e) =>{
const button = e.currentTarget;
const currentUnit = button.innerText.slice(1)

const isCelcius = currentUnit ==='C';
button.innerText = isCelcius ? '°F' : '°C'
setUnits(isCelcius ? "metric" : "imperial");
};
const enterKeyPressed = (e) => {
if(e.keyCode == 13){
  setCity(e.currentTarget.value)
  e.currentTarget.blur();
}
}

  return (
  <div className="APP" style={{ backgroundImage: `url(${bg})` }} >
      <div className="overlay">
        {
          weather && (
<div className="container">
          <div className="section section__inputs">
            <input onKeyDown={enterKeyPressed} type="text" name="City" placeholder="Enter City..." />
            <button onClick={(e) => handleUnitsClick(e)}>°F</button>
          </div>
          <div className="section section__temperature">
            <div className="icon">
              <h3> {`${weather.name}, ${weather.country}`} </h3>
              <img src={weather.iconURL} alt="weatherIcon" />
              <h3> {weather.description} </h3>
            </div>
            <div className="Temperature">
              <h1> {`${weather.temp.toFixed()} ° ${units === 'metric' ? 'C' : 'F'}  `} </h1>
            </div>
          </div>

          {/*bottom description*/}
          < Description weather= {weather} units={units} />
        </div>
          )
        }
        
      </div>
    </div>

  );
}

export default App;
