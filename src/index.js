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
  return `Current time: ${currentDay}, ${currentHour}:${currentMinutes}`;
}

let displayCurrentTime = document.querySelector("#current-time");
let now = new Date();
displayCurrentTime.innerHTML = formatDate(now);

// let cityNameDisplay = document.querySelector("h1.city-name");


function showWeather(response) {
    console.log(response);
    console.log(response.data.current.temp);
    let temperature = Math.round(response.data.current.temp);
    let temperatureElement = document.querySelector("#temp-value");
    let cityNameDisplay = document.querySelector("#city-name");
    let wind = Math.round(response.data.current.wind_speed);
    let windElement = document.querySelector("#wind-value");
    let humidity = response.data.current.humidity;
    let humidityElement = document.querySelector("#humidity-value")
    temperatureElement.innerHTML = temperature;
    console.log(response.data.timezone);
    cityNameDisplay.innerHTML = response.data.timezone;
    windElement.innerHTML = `${wind} m/s`;
    humidityElement.innerHTML = `${humidity} %`;
  }

// function alertCity(event) {
//   event.preventDefault();
//   let cityName = document.querySelector("#city-input");
//   let apiEndPoint = "https://api.openweathermap.org/data/2.5/";
//   let apiUrl = `${apiEndPoint}/weather?q=${cityName.value}&appid=8ea9a418f9dd13e967a728a357801a35&units=metric;
  
//   axios.get(`${apiUrl}`).then(showTemperature);

//   if (cityName.value) {
//       cityNameDisplay.innerHTML = `${cityName.value}`;
      
//   } else {
//       cityNameDisplay.innerHTML = null;
//       alert("Please type something");

//     }
//     apiUrl =`https://api.openweathermap.org/data/2.5/onecall?q=${city}&appid=${apiKey}&units=metric`;
//     axios.get(apiUrl).then(displayForecast);
// }

// let searchCityButton = document.querySelector("#find");
// searchCityButton.addEventListener("click", alertCity);



function handlePosition(position) {
    // let latitude = position.lat;
    // let longitude = position.lon;
    let apiUrlGeo = "https://api.openweathermap.org/data/2.5/onecall?lat=33.4418&lon=-94.0377&exclude=minutely,hourly,alerts&appid=8ea9a418f9dd13e967a728a357801a35&units=metric";

    console.log(apiUrlGeo);

    axios.get(`${apiUrlGeo}`).then(showWeather);
}

function getGeoLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}
  
let searchGeoButton = document.querySelector("#current-location");
searchGeoButton.addEventListener("click", getGeoLocation);


