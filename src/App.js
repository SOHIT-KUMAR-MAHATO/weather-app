import React, { useState } from 'react';
import './App.css';
function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3001/api/weather?location=${location}`);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error(error);
    }
  };
  const spacing=18;
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };


  return (
    <div>
      <header className='d-flex text-center justify-content-center'>
        <p className="p-2">The Weather App</p>
      </header>
      <div className="cont">
        <img src="https://png.pngtree.com/png-clipart/20190921/original/pngtree-hand-drawn-yellow-cute-sun-smiley-png-image_4702532.jpg" alt="im" />
      <input 
        type="text" placeholder='Enter city name'
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        />
      <button onClick={handleSearch}>Search</button>
      
      </div>
      
      {weatherData && (
        <div className="cen">
      <div class="card bd" style={{width:+spacing +'rem'}}>
        <img class="card-img-top" src="https://i1.wp.com/www.differencebetween.com/wp-content/uploads/2011/11/Partly-Cloudy_Difference-Between-Partly-Cloudy-and-Mostly-Sunny.png" alt="Weather"/>
        <div class="card-body">
        <h2 class="card-title"> {capitalizeFirstLetter(location)}</h2>
          <h3 class="card-text">Temperature: {weatherData.temperature} °C</h3>
          <h3 class="card-text">Humidity: {weatherData.humidity}%</h3>
        </div>
        </div>
      </div>
      )}
    </div>
  );
}
export default App;
