// Get references to HTML elements
var submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', function() {
    var searchInput = document.getElementById('searchInput');
    var city = searchInput.value;
    fetchWeatherData(city);
    function fetchWeatherData(city) {
        var apiKey = 'e0948e49398ecf759c545ec952d5f846';
        var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}`;
      
        fetch(apiUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error('Unable to fetch weather data.');
            }
            return response.json();
          })
          .then(data => {
            // Process the weather data
            console.log('Weather data:', data);
            console.log(data);
            
            // Example: Extract temperature and description
            var temperature = data.main.temp;
            var humidity = data.main.humidity;
            var wind_speed = data.main.wind_speed;
      
            // Example: Display the temperature and description in the UI
            var temperatureElement = document.getElementById('temperature');
            var humidityElement = document.getElementById('humidity');
            var wind_speed = document.getElementById('wind_speed');
            temperatureElement.textContent = temperature;
            humidityElement.textContent = humidity;
            wind_speedElement.textContent = wind_speed;
          })
          .catch(error => {
            console.log('Error fetching weather data:', error);
          });
      }





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

});