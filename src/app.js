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
   let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
   let day = days[date.getDay()];
   return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
   let temperatureElement = document.querySelector("#temperature");
   let cityElement = document.querySelector("#city")
   let description = document.querySelector("#description");
   let humidityElement = document.querySelector("#humidity");
   let windElement = document.querySelector("#wind");
   let dateElement = document.querySelector("#current-date");
   temperatureElement.innerHTML = Math.round(response.data.main.temp);
   cityElement.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
   description.innerHTML = response.data.weather[0].description;
   humidityElement.innerHTML = response.data.main.humidity;
   windElement.innerHTML = Math.round(response.data.wind.speed);
   dateElement.innerHTML = formatDate(response.data.dt * 1000)
}



let apiKey = "d408beb6fdb204fdf27972516e99f835";
let apiUrl =
   `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);