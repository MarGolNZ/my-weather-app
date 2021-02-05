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
  return `${currentDay} ${currentHour}:${currentMinutes}`;
}

let displayCurrentTime = document.querySelector("#current-time");
let now = new Date();
displayCurrentTime.innerHTML = formatDate(now);

// On your project, when a user searches for a city (example: New York), 
// it should display the name of the city on the result page and the current temperature of the city.

let cityNameDisplay = document.querySelector("h1.city-name");


function showTemperature(response) {
    console.log(response.data.main.temp);
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = temperature;
    cityNameDisplay.innerHTML = response.data.name;
  }

function alertCity(event) {
  event.preventDefault();
  console.log("alertCity");
  let cityName = document.querySelector("#city-input");
  let apiKey = "8ea9a418f9dd13e967a728a357801a35";
  let units = "metric";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/";
  let apiUrl = `${apiEndPoint}/weather?q=${cityName.value}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl)

  axios.get(`${apiUrl}`).then(showTemperature);

  if (cityName.value) {
      cityNameDisplay.innerHTML = `${cityName.value}`;
      
  } else {
      cityNameDisplay.innerHTML = null;
      alert("Please type something");
    }
}

let searchCityButton = document.querySelector("#find");
console.log(searchCityButton)
searchCityButton.addEventListener("click", alertCity);



// Add a Current Location button. When clicking on it,
// it uses the Geolocation API to get your GPS coordinates and display
// and the city and current temperature using the OpenWeather API.

function handlePosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiUrlGeo = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8ea9a418f9dd13e967a728a357801a35&units=metric`;
    axios.get(`${apiUrlGeo}`).then(showTemperature);
    
}

function getGeoLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}
  
let searchGeoButton = document.querySelector("#current-location");
console.log(searchGeoButton);
searchGeoButton.addEventListener("click", getGeoLocation);
