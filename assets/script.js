//https://api.openweathermap.org / data / 2.5 / forecast ? lat = { lat } & lon={ lon }& appid=weather

var cities = [];


$("#search-city").on('click', function (event) {
    event.preventDefault();
    var city = $('#city-input').val().trim()

    cities.push(city);

    // displayCity();
    // searchHistory();


});

//figure out api

// create function that pulls 5 day forcast from api

//create a current weather function for main card

// store searched values and display in history