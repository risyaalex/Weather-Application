const apiKey = document.getElementById('app').getAttribute('data-api-key');

const lat = 123; 
const lon = 456; 

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

console.log(url);