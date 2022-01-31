let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDate = document.querySelector(".current-time");
currentDate.innerHTML = `${day} ${hours}:${minutes}`;

function displayWeatherTemperature(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("h2").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity-level").innerHTML =
    response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
}

//allows to display a city by default
function searchCity(city) {
  let apiKey = "459f06da33a24f62f603d05f7a2963f4";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

function searchPosition(position) {
  let latitude = `${position.coords.latitude}`;
  let longitude = `${position.coords.longitude}`;
  let apiKey = "459f06da33a24f62f603d05f7a2963f4";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherTemperature);
}

function changeTemperatureToCelsius(event) {
  event.preventDefault();
  let celsiusDegrees = document.querySelector("h2");
  celsiusDegrees.innerHTML = 12;
}

function changeTemperatureToFarhrenheit(event) {
  event.preventDefault();
  let farhrenheitDegrees = document.querySelector("h2");
  farhrenheitDegrees.innerHTML = 54;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let celsiusTemperature = document.querySelector("#celsius-link");
celsiusTemperature.addEventListener("click", changeTemperatureToCelsius);

let farhrenheitTemperature = document.querySelector("#farhrenheit-link");
farhrenheitTemperature.addEventListener(
  "click",
  changeTemperatureToFarhrenheit
);

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}

let currentPositionButton = document.querySelector("#current-position");
currentPositionButton.addEventListener("click", getCurrentPosition);

//city by default
searchCity("New York");
