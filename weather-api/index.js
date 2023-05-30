const express = require('express');
const cors = require('cors');
const axios = require('axios');

const corsOptions = {
  origin: 'http://localhost:3000',
};

const app = express();
app.use(cors(corsOptions));


const API_KEY = 'f757dd2624746de7b69172d8365f1328';

app.get('/api/weather', async (req, res) => {
  const { location } = req.query;
  console.log(location);

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`);
    const { main } = response.data;
    const temperatureKelvin = main.temp;
    const temperatureCelsius = temperatureKelvin - 273.15; // Convert Kelvin to Celsius
    const weatherData = {
      temperature: temperatureCelsius.toFixed(2), // Limit decimal places to 2
      humidity: main.humidity,
    };
    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});
const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
