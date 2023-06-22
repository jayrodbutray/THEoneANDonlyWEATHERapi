var timeEl = document.getElementById("time");
var dateEl = document.getElementById("date");
var currentWeatherItemsEl = document.getElementById("current-weather-items");
var timezone = document.getElementById("time-zone");
var countryEl = document.getElementById("country");
var weatherForecastEl = document.getElementById("weather-forecast");
var currentTempEl = document.getElementById("current-temp");

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


setInterval(() => {
    var time = new Date();
    var month = time.getMonth();
    var date = time.getDate();
    var day = time.getDay();
    var hour = time.getHours();
    var minutes = time.getMinutes();
    var hoursIn12HrFormat;
    var ampm;
if (hour >= 12) {
  ampm = "PM";
} else {
  ampm = "AM";
}

if (hour >= 13 && hour <= 23) {
  hoursIn12HrFormat = hour - 12;
} else if (hour === 0){
  hoursIn12HrFormat = 12;
} else{
    hoursIn12HrFormat = hour;
}
console.log("hoursIn12HrFormat");

timeEl.innerHTML = `${hoursIn12HrFormat}:${minutes} <span id="am-pm">${ampm}</span>`;

dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month];

}, 1000);

getWeatherData();
function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
      let { latitude, longitude } = success.coords;
  
      var API_KEY = 'e0948e49398ecf759c545ec952d5f846';
  
      var url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`;
  
      fetch(url)
        .then(response => response.json())
        .then(data => {
          // Process the retrieved weather data
          console.log(data);
          showWeatherData(data);
        })
        .catch(error => {
          // Handle any errors
          console.log('Error:', error);
        });
    });
  }
  function showWeatherData(data){
    let humidity, pressure
  }