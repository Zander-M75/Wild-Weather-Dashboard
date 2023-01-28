
var apiKey = 'f68137963a992fce4db0ebc2883bf550';
var today = dayjs()

var form = document.querySelector('form');
var currentWeather = document.querySelector('.current-weather');
var currentCity = document.querySelector('.current-city');
var currentTemp = document.querySelector('#current-temp');
var currentHumidity = document.querySelector('#current-humidity');
var currentWind = document.querySelector('#current-wind');

var upcomingWeather = document.querySelector('.upcoming-weather');
var upcomingTemp = document.querySelector('#upcoming-temp');
var upcomingHumidity = document.querySelector('#upcoming-humidity');
var upcomingWind = document.querySelector('#upcoming-wind');
var upcomingForecast = document.querySelector('.day');

var cityQuery = document.querySelector('#city');
var savedCities = JSON.parse(localStorage.getItem('cities')) || [];
var buttonParent = document.querySelector('.button-parent');
var displayIcon = document.querySelector('.icon');
var upcomingIcon = document.querySelector('.upcoming-icon');
var hide = document.querySelectorAll('.hide');


form.addEventListener('submit', function (event) {
    event.preventDefault();
    var city = cityQuery.value;
    if (city) {
        getWeather(city);
        cityQuery.value = '';
    } else {
        alert('Please enter a city');
    }
}
);


function getWeather(city) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayWeather(data, city);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to OpenWeather');
        });
}

function displayWeather(data, city) {
    currentWeather.classList.remove('hide');
    upcomingWeather.classList.remove('hide');
    currentCity.textContent = city + ' ' + today.format('MM/DD/YYYY');
    currentTemp.textContent = 'Temp: ' + data.main.temp + ' °F';
    currentHumidity.textContent = 'Humidity: ' + data.main.humidity + '%';
    currentWind.textContent = 'Wind Speed: ' + data.wind.speed + ' MPH';
    var iconCode = data.weather[0].icon;
    var iconUrl = 'http://openweathermap.org/img/w/' + iconCode + '.png';
    displayIcon.setAttribute('src', iconUrl);
    getForecast(city);
    if (savedCities.indexOf(city) === -1) {
        savedCities.push(city);
        localStorage.setItem('cities', JSON.stringify(savedCities));
        createButton(city);
    }
}

function createButton(city) {
    var button = document.createElement('button');
    button.classList.add('btn', 'btn-primary', 'btn-block', 'city-button');
    button.textContent = city;
    buttonParent.appendChild(button);
}

function getForecast(city) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayForecast(data);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to OpenWeather');
        });
}

function displayForecast(data) {
    upcomingWeather.classList.remove('hide');
    var forecast = data.list;
    upcomingForecast.innerHTML = '';
    for (var i = 0; i < forecast.length; i++) {
        if (forecast[i].dt_txt.indexOf('15:00:00') !== -1) {
            var upcomingDate = document.createElement('h5');
            upcomingDate.textContent = dayjs(forecast[i].dt_txt).format('MM/DD/YYYY');
            var upcomingTemp = document.createElement('p');
            upcomingTemp.textContent = 'Temp: ' + forecast[i].main.temp + ' °F';
            var upcomingHumidity = document.createElement('p');
            upcomingHumidity.textContent = 'Humidity: ' + forecast[i].main.humidity + '%';
            var upcomingIcon = document.createElement('img');
            var iconCode = forecast[i].weather[0].icon;
            var iconUrl = 'http://openweathermap.org/img/w/' + iconCode + '.png';
            upcomingIcon.setAttribute('src', iconUrl);
            var upcomingDiv = document.createElement('div');
            upcomingDiv.classList.add('col', 'upcoming-weather');
            upcomingDiv.appendChild(upcomingDate);
            upcomingDiv.appendChild(upcomingIcon);
            upcomingDiv.appendChild(upcomingTemp);
            upcomingDiv.appendChild(upcomingHumidity);
            upcomingForecast.appendChild(upcomingDiv);
        }
    }
}

function getSavedCities() {
    for (var i = 0; i < savedCities.length; i++) {
        createButton(savedCities[i]);
    }
}

function buttonClick(event) {
    var element = event.target;
    if (element.matches('button')) {
        getWeather(element.textContent);
    }
}

buttonParent.addEventListener('click', buttonClick);

getSavedCities();



