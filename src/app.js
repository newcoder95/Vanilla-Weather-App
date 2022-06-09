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
      "Sunday",
   ];
   let day = days[date.getDay()];
   return `${day} ${hours}:${minutes}`;
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
   iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
   );
   iconElement.setAttribute("alt", response.data.weather[0].description);
   pressureElement.innerHTML = Math.round(response.data.main.pressure * 0.750062);
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



function displayFahrenheitTemp(event) {
   event.preventDefault();
   let temperatureElement = document.querySelector("#temperature");
   //remove active link to celsius
   celsiusLink.classList.remove("active");
   fahrenheitLink.classList.add("active");
   let fahrenheitTemp = (celsiusElement * 9) / 5 + 32;
   temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsiusTemp(event) {
   event.preventDefault();
   let temperatureElement = document.querySelector("#temperature");
   temperatureElement.innerHTML = Math.round(celsiusElement);
   celsiusLink.classList.add("active");
   fahrenheitLink.classList.remove("active");
}

let celsiusElement = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

search("Сушки");