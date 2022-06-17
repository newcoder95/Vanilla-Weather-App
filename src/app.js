function formatDate(timestamp) {
   let date = new Date(timestamp);
   let hours = date.getHours();
   if (hours < 10) {
      hours = `0${hours}`;
   }
   let minutes = date.getMinutes();
   if (minutes < 10) {
      minutes = `0${minutes}`;
   }
   let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
   ];
   let day = days[date.getDay()];
   return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
   let date = new Date(timestamp * 1000);
   let day = date.getDay();
   let days = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat"
   ];
   return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  // let days = ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
    <div class="weather-forecast-day">${formatDay(forecastDay.dt)}</div>


<img src="src/img/icons_w/${forecastDay.weather[0].icon}.svg" alt="forecast">


   
   <div class="weather-forecast-temperatures">
   <span class="weather-forecast-temperature-max">
   ${Math.round(forecastDay.temp.max)}°
   </span>
   <span class="weather-forecast-temperature-min">
   ${Math.round(forecastDay.temp.night)}°
   </span>
   </div>
   </div>
   `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "d408beb6fdb204fdf27972516e99f835";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let description = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let pressureElement = document.querySelector("#pressure");
  let dateElement = document.querySelector("#current-date");
  let iconElement = document.querySelector("#icon");

  celsiusElement = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  description.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);

  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconW = response.data.weather[0].icon;
  iconElement.setAttribute(
    "src",
    `src/img/icons_w/${iconW}.svg`
    // `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  pressureElement.innerHTML = Math.round(
    response.data.main.pressure * 0.750062
  );

  getForecast(response.data.coord);
}

function search(city) {
   let apiKey = "d408beb6fdb204fdf27972516e99f835";
   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
   axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
   event.preventDefault();
   let cityInputElement = document.querySelector("#city-input");
   search(cityInputElement.value);
}

function searchLocation(position) {
   let apiKey = "d408beb6fdb204fdf27972516e99f835";
   let latitude = position.coords.latitude;
   let longitude = position.coords.longitude;
   let units = "metric";
   let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
   let apiUrl = `${apiEndPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
   axios.get(apiUrl).then(displayTemperature);
}

function getCurrentLocation(event) {
   event.preventDefault();
   navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);


let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

search("Київ");