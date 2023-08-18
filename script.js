const apiKey = "72041d4067825c55c76d14bc52f6fd85";

const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const weatherInfo = document.getElementById('weather-info');

let data = null;
let isLoading = false;

// fetch Data

 async function fetchData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
    isLoading = true;
    const response = await fetch(url);
        if (!response.ok) {
        data = null;
        throw new Error("Network response was not ok"); 
    }
    
    data = await response.json();
    console.log("Loading data...");
    // fetchWeatherData(data);
    console.log("FETCHING DATA...");
  } catch (error) {
    console.error(
      "There was a problem with the fetch operation:",
      error.message
    );
  } finally {
    isLoading = false;
    fetchWeatherData(data);
    // console.log("fetchData:", data);
    console.log("END OF FETCHING DATA...");
  }
}

// render Data

function fetchWeatherData(data) {
  let content = "";

  if (data) {
      content = `<div class="weather-info">    
      <h2>${data.name}, ${data.sys && data.sys.country}</h2>
      <div class="weathericon">
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].main}" title="${data.weather[0].description}"/>
      <h3>${Math.round(data.main.temp)}°C</h3>
      </div>
      <div class="weather-description"><h3>${data.weather[0].description}</h3></div>
      <div class="weather-info-main">
        <div class="full">
        <p><strong>Feels Like:</strong> ${Math.round(data.main.feels_like)} °C</p>
        <p><strong>Humidity:</strong> ${data.main.humidity} %</p>
        </div> 
        <div class="full">
        <p><strong>Pressure:</strong> ${data.main.pressure} hPa</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        </div> 
      </div>
      <div class="sunrise">
        <div class="full"><p><span class="material-symbols-outlined">
water_lux
</span> <strong>Sunrise:</strong> ${formatUnixTimeToUTC(data.sys.sunrise, data.timezone)}</p></div>
        <div class="full"><p><span class="material-symbols-outlined">
wb_twilight
</span> <strong>Sunset:</strong>  ${formatUnixTimeToUTC(data.sys.sunset, data.timezone)}</p></div>  
      </div>
      </div>
    `;
    console.log(data.sys.sunrise)
    console.log(data.sys.sunset)
    console.log(data.timezone)
  } else {
    content = `<p class="error">City not found or data unavailable...</p>`;
  }

  console.log("fetchWeatherData:", data);

  weatherInfo.innerHTML = isLoading ? `<p class="error">Loading Data...</p>` : content;
}



function searchCity() {
    const cityName = cityInput.value.trim();
    cityName ? fetchData(cityName) : weatherInfo.innerHTML = `<p class="error">Please enter city</p>`;
}

searchButton.addEventListener('click', searchCity);


// format time

function formatTimeWithAMPM(hours, minutes, seconds) {
    let period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; 
    let formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
    return formattedTime;
}

function formatUnixTimeToUTC(unixTime, timeZoneOffsetSeconds) {
    let time = new Date((unixTime + timeZoneOffsetSeconds) * 1000);

    let hours = time.getUTCHours();
    let minutes = time.getUTCMinutes();
    let seconds = time.getUTCSeconds();

    return formatTimeWithAMPM(hours, minutes, seconds);
}
