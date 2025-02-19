function getWeather() {
  
    const api_key = "098d5177a4de9c48205484e1884ea325";
    let city = document.querySelector("#city").value;
    
    if (!city) {
      alert("Type city name");
      return 
    }
    
    getWeatherData(city, api_key);
    getForecastData(city, api_key);
} 


async function getWeatherData(city, api_key) {
   
   const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
   
   try {
     
     let response = await fetch(weatherUrl);
     
     if (!response.ok) {
       console.error("didnt get the resonse");
       alert(`${city} doesn't exit in database`);
     } else {
       
       let weatherData = await response.json();
       
       const iconCode = weatherData.weather[0].icon;
       const weatherIconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
       const weatherDescription = weatherData.weather[0].main;
       const cityName = weatherData.name;
       const weatherTemp = Math.round(weatherData.main.temp - 273.15);
       const humidity = weatherData.main.humidity;
       const pressure = weatherData.main.pressure;
       const feelsLike = Math.round(weatherData.main.feels_like - 273.15);
   
       displayWeatherData(weatherIconUrl, weatherDescription, cityName, weatherTemp, humidity, pressure, feelsLike);
     }
     
     
   } catch (e) {
     throw console.error(e);
     alert("sorry there is an error, try again");
   }
   
}


function displayWeatherData(weatherIconUrl, weatherDescription, cityName, weatherTemp, humidity, pressure, feelsLike) {
  
  const currentWeatherBox = document.querySelector(".current-weather");
  const extraInfoDiv = document.querySelector(".extra-info");
  
  let weatherIcon = currentWeatherBox.querySelector("#current-weather-icon");
  let tempP = currentWeatherBox.querySelector("#temp");
  let cityNameP = currentWeatherBox.querySelector("#cityName");
  let weatherDescriptionP = currentWeatherBox.querySelector("#description");
  
  let humidityP = document.querySelector("#humidity");
  let pressureP = document.querySelector("#pressure");
  const feelsLikeP = document.querySelector("#feelslike");
  
  extraInfoDiv.style.display = "flex";
  
  weatherIcon.src = weatherIconUrl;
  tempP.innerText = `${weatherTemp}\u00B0C`;
  cityNameP.innerText = cityName;
  weatherDescriptionP.innerText = weatherDescription;
  
  humidityP.innerText = `${humidity}%`;
  pressureP.innerText = `${pressure} hPa`;
  feelsLikeP.innerText = `${feelsLike}\u00B0C`;
}


async function getForecastData(city, api_key) {
  
  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}`;
  
  let response = await fetch(forecastUrl);
  let forecastData = await response.json();
  
  
  for (var i = 1; i < 10; i++) {
    
    let forecastHour = forecastData.list[i].dt_txt.slice(11, 16)
    let forecastTemp = Math.round(forecastData.list[i].main.temp - 273.15);
    let forecastIconCode = forecastData.list[i].weather[0].icon;
    let forecastIcon = `https://openweathermap.org/img/wn/${forecastIconCode}@4x.png`
    
    displayForecastData(forecastHour, forecastTemp, forecastIcon)
    
  }
}

function displayForecastData(forecastHour, forecastTemp, forecastIcon) {
   
   const forecastDiv = document.querySelector(".forecast");
   
   let hourlyDiv = document.createElement("div");
   let forecastTimeP = document.createElement("p");
   let forecastIconImg = document.createElement("img");
   let forecastTempP = document.createElement("p");
   
   hourlyDiv.setAttribute("class","hourly-forecast");
   forecastTimeP.setAttribute("class","forecast-time");
   forecastIconImg.setAttribute("class","forecast-img");
   forecastTempP.setAttribute("class","forecast-temp");
   
   forecastTimeP.innerText = forecastHour;
   forecastIconImg.src = forecastIcon;
   forecastTempP.innerText = `${forecastTemp}\u00B0C`
   
   hourlyDiv.append(forecastTimeP);
   hourlyDiv.append(forecastIconImg);
   hourlyDiv.append(forecastTempP);
   forecastDiv.append(hourlyDiv);
   
  }