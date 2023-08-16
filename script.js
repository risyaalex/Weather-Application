const API_KEY = process.env.REACT_APP_API_KEY;

const lat = 123; 
const lon = 456; 

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

console.log(url);