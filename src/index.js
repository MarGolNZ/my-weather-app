let temperatureUnit = "metric";


function formatDate(date) {
    let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wendesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let currentDay = weekDays[date.getDay()];
  let currentHour = date.getHours();
  if (currentHour <10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes <10) {
    currentMinutes = `0${currentMinutes}`;
  }
  return `Last updated: ${currentDay}, ${currentHour}:${currentMinutes}`;
}


function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temp-value");
  temperatureElement.innerHTML = temperature;
  let cityNameDisplay = document.querySelector("#city-name");
  cityNameDisplay.innerHTML = response.data.name;
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind-value");
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity-value");
  windElement.innerHTML = `${wind} m/s`;
  humidityElement.innerHTML = `${humidity} %`;
  let weatherIcon = response.data.weather[0].icon;
  let weatherConditionElement = document.querySelector("#weather-icon");
  let description = response.data.weather[0].description;
  let weatherDesciptionElement = document.querySelector("#description-value");
  let dateElement = document.querySelector("#current-time");
  let now = new Date(response.data.dt * 1000);
  weatherConditionElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt=""/>`;
  weatherDesciptionElement.innerHTML = `${description}`;
  dateElement.innerHTML = formatDate(now);

}

function alertCity(event) {   
    event.preventDefault();
    let cityNameInput = document.querySelector("#city-input");
    
    
    if (cityNameInput.value) {
          cityNameInput.innerHTML = `${cityNameInput.value}`;
          let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityNameInput.value}&appid=8ea9a418f9dd13e967a728a357801a35&units=metric`;
          console.log(apiUrl)
          axios.get(apiUrl).then(showTemperature);
      } else {
          cityNameInput.innerHTML = null;
          alert("Please type something");

      }  
    

      

      
        // apiUrl =`https://api.openweathermap.org/data/2.5/onecall?q=${city}&appid=${apiKey}&units=metric`;
        // axios.get(apiUrl).then(displayForecast);
    }

  let searchCityButton = document.querySelector("#find");
  searchCityButton.addEventListener("click", alertCity);





function showWeather(response) {
    console.log(response);
    console.log(response.data.current.temp);
    let temperature = Math.round(response.data.current.temp);
    let temperatureElement = document.querySelector("#temp-value");
    let cityNameDisplay = document.querySelector("#city-name");
    let wind = Math.round(response.data.current.wind_speed);
    let windElement = document.querySelector("#wind-value");
    let humidity = response.data.current.humidity;
    let humidityElement = document.querySelector("#humidity-value");
    let weatherIcon = response.data.current.weather[0].icon;
    let weatherConditionElement = document.querySelector("#weather-icon");
    let description = response.data.current.weather[0].description;
    let weatherDesciptionElement = document.querySelector("#description-value");
    let dateElement = document.querySelector("#current-time");
    let now = new Date(response.data.current.dt * 1000);
    console.log(now);
    temperatureElement.innerHTML = temperature;
    console.log(response.data.timezone);
    cityNameDisplay.innerHTML = response.data.timezone;
    windElement.innerHTML = `${wind} m/s`;
    humidityElement.innerHTML = `${humidity} %`;
    weatherConditionElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt=""/>`;
    weatherDesciptionElement.innerHTML = `${description}`;
    dateElement.innerHTML = formatDate(now);

  }

function handlePosition(position) {
    console.log(position);
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiUrlGeo = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=8ea9a418f9dd13e967a728a357801a35&units=metric`;

    console.log(apiUrlGeo);

    axios.get(`${apiUrlGeo}`).then(showWeather);
}

function getGeoLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}
  
let searchGeoButton = document.querySelector("#current-location");
searchGeoButton.addEventListener("click", getGeoLocation);

function convertToFahrenheit(event) {
  event.preventDefault();
  console.log("convertToFahrenheit");
  let temperatureDisplay = document.querySelector("#temp-value");
  let temperatureValue = temperatureDisplay.innerHTML;
  let convertTemp = Math.round((temperatureValue * 9/5) + 32);
  temperatureDisplay.innerHTML = convertTemp;
  
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);