function displayTemperature(response){
   let temperatureElement = document.querySelector("#temperature");
   let cityElement = document.querySelector("#city")
   let description = document.querySelector("#description");
   let humidityElement = document.querySelector("#humidity");
   let windElement = document.querySelector("#wind");
   temperatureElement.innerHTML = Math.round(response.data.main.temp);
   cityElement.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
   description.innerHTML = response.data.weather[0].description;
   humidityElement.innerHTML = response.data.main.humidity;
   windElement.innerHTML = Math.round(response.data.wind.speed);
}



let apiKey = "d408beb6fdb204fdf27972516e99f835";
let apiUrl =
  `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);

