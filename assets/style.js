// Get references to HTML elements
var submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', function () {
  var searchInput = document.getElementById('searchInput');
  var city = searchInput.value;
  fetchWeatherDataCombined(city);
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
        var wind_speed = data.wind.speed;

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
});



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
  } else if (hour === 0) {
    hoursIn12HrFormat = 12;
  } else {
    hoursIn12HrFormat = hour;
  }
  console.log("hoursIn12HrFormat");

  timeEl.innerHTML = `${hoursIn12HrFormat}:${minutes} <span id="am-pm">${ampm}</span>`;

  dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month];

}, 1000);


function fetchWeatherDataCombined(city) {
  var apiKey = 'e0948e49398ecf759c545ec952d5f846';
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=imperial&appid=${apiKey}`;
  var futureApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=imperial&appid=${apiKey}`;

  var currentWeather = fetch(apiUrl).then(response => {
    if (!response.ok) {
      throw new Error('Unable to fetch weather data.');
    }
    return response.json();
  });
  var futureWeather = fetch(futureApiUrl).then(response => {
    if (!response.ok) {
      throw new Error('Unable to fetch weather data.');
    }
    return response.json();
  });

  Promise.all([currentWeather, futureWeather]).then(dataArray => {
    var currentWeatherData = dataArray[0];
    var futureWeatherData = dataArray[1];
    

    // Example: Extract temperature,humidity, and windspeed
    var temperature = currentWeatherData.main.temp;
    var humidity = currentWeatherData.main.humidity;
    var wind_speed = currentWeatherData.wind.speed;

    //Process info to display current weather
    console.log('Current weather data:', currentWeatherData);
    var temperatureElement = document.getElementById('temperature');
    var humidityElement = document.getElementById('humidity');
    var wind_speedElement = document.getElementById('wind_speed');
    temperatureElement.textContent = temperature;
    humidityElement.textContent = humidity;
    wind_speedElement.textContent = wind_speed;

    var currentImageIcon = document.createElement("img");
    var currentIconUrl = `https://openweathermap.org/img/w/${currentWeatherData.weather[0].icon}.png`; 
    currentImageIcon.setAttribute("src", currentIconUrl);

    var currentWeatherInfo = document.getElementById("currentweatheritems");
    currentWeatherInfo.appendChild(currentImageIcon);

    //Process info to display for future forecast
    console.log('Future weather data:', futureWeatherData);
    var futureForecastElement = document.querySelector(".future-forecast")
    futureForecastElement.innerHTML = '';

    for (var i = 0; i < futureWeatherData.list.length; i += 8) {
      var forecastData = futureWeatherData.list[i];
      var forecastFutureDate = new Date(forecastData.dt * 1000);
      var forecastTemperature = forecastData.main.temp;
      var forecastHumidity = forecastData.main.humidity;
      var forecastWindSpeed = forecastData.wind.speed;

      var forecastFutureItemElement = document.createElement("div");
      forecastFutureItemElement.classList.add("forecast-item");

      var dateElement = document.createElement("div");
      dateElement.textContent = forecastFutureDate.toLocaleDateString('en-US', { weekday: 'short' });

      var temperatureElement = document.createElement("div");
      temperatureElement.textContent = forecastTemperature + '°F';

      var humidityElement = document.createElement("div");
      humidityElement.textContent = forecastHumidity + '%';

      var windSpeedElement = document.createElement("div");
      windSpeedElement.textContent = forecastWindSpeed + "mph";
    


      var imageIcon = document.createElement("img");
      var iconUrl = `https://openweathermap.org/img/w/${forecastData.weather[0].icon}.png`; 
      imageIcon.setAttribute("src", iconUrl);

      var container = document.querySelector(".future-forecast");
      container.appendChild(imageIcon);

      console.log(forecastData);
      
      
      //TO DO!!!!!
  //var imageIcon = document.createElement("img");
  //imageIcon.setAttribute("src", add i variable with url sent my Michael)

      forecastFutureItemElement.appendChild(dateElement);
      forecastFutureItemElement.appendChild(temperatureElement);
      forecastFutureItemElement.appendChild(humidityElement);
      forecastFutureItemElement.appendChild(windSpeedElement);

      futureForecastElement.appendChild(forecastFutureItemElement);

    }
  })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}