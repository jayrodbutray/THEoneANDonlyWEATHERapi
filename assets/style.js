
//add weather api key
    var apiKey = '67e13df9856c16c7a85cf522557bfa6d';

//api url from which to fetch data
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast

//first function to fetch weather location, temp and description
    function getWeather() {
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          var locationElement = document.getElementById('location');
          var temperatureElement = document.getElementById('temperature');
          var descriptionElement = document.getElementById('description');

//code to update and make sure there are no errors
          locationElement.textContent = `Location: ${data.location.name}, ${data.location.country}`;
          temperatureElement.textContent = `Temperature: ${data.current.temp_c}°C`;
          descriptionElement.textContent = `Description: ${data.current.condition.text}`;
        })
        .catch(error => console.log(error));
    }

//function call to get above code to display needed info.
    getWeather();