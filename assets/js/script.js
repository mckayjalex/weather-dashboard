const searchBtn = document.querySelector('#search-button');
const weatherSectionEl = document.querySelector('#weather-content');
const sideBar = document.querySelector('#side-bar');

let searchHistory = [];

function searchApi(query) {

    let initialUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + query + '&units=metric&appid=fe4edba997563cd1cffd343bf3a1a5ff';
    let lon;
    let lat;
    let cityName;

    fetch(initialUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (data) {
            lat = data.coord.lat;
            lon = data.coord.lon;
            cityName = data.name;

        })
        .then(function () {
            let weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=metric&appid=fe4edba997563cd1cffd343bf3a1a5ff';
            fetch(weatherUrl)
                .then(function (response) {
                    if (!response.ok) {
                        throw response.json();
                    }
                    return response.json();
                })
                .then(function (data) {
                    printResults(data, cityName);
                })
        })

}

function printResults(results, name) {
   
    // Clear previous location data
    weatherSectionEl.innerHTML = '';
    
    // Show current day 
    // Adding a card and div elements
    let locationEl = document.createElement('div');
    locationEl.classList.add('card');
    weatherSectionEl.append(locationEl);
    let locationHeader = document.createElement('div');
    locationHeader.classList.add('card-header', 'd-flex', 'flex-row');
    let locationInfo = document.createElement('div');
    locationInfo.classList.add('card-body');
    locationEl.append(locationHeader, locationInfo);
    
    // Adding location title to the card
    let title = document.createElement('h2');
    title.textContent = name;
    title.classList.add('card-title');
    
    // Adding weather image next to title
    let weatherImage = document.createElement('img');
    let iconcode = results.current.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    weatherImage.setAttribute('src', iconurl);
    locationHeader.append(title, weatherImage);
    
   
    // Adding temp to the card body
    let temp = document.createElement('p');
    temp.textContent = 'Temp: ' + results.current.temp + 'c';
    
    // Adding wind to the card body
    let wind = document.createElement('p');
    wind.textContent = 'Wind: ' + results.current.wind_speed + 'km/h';
    
    // Adding humidity to the card body
    let humidity = document.createElement('p');
    humidity.textContent = 'Humidity: ' + results.current.humidity + '%';
    
    // Adding UV index to the card body
    let index = document.createElement('p');
    index.textContent = 'UV Index: ' + results.current.uvi;

    locationInfo.append(temp, wind, humidity, index);
    
    // Adding 5 day foorecast
    let forecast = document.createElement('div');
    forecast.classList.add('d-flex')
    weatherSectionEl.append(forecast);

    setHistory(name);

    // Day one day forecast

    for (let i = 0; i < 5; i++) {
        let contain = document.createElement('div')
        contain.classList.add('weekday', 'card')
        forecast.append(contain);

        let day = document.createElement('div');
        day.classList.add('card-body');

        let date = document.createElement('h3');
        date.textContent = moment().add(i + 1, 'days').format('dddd');
        date.classList.add('card-title');
        day.append(date);

        let image = document.createElement('img');
        let code = results.daily[i].weather[0].icon;
        var iUrl = "http://openweathermap.org/img/w/" + code + ".png";
        image.setAttribute('src', iUrl);
        date.classList.add('card-text');
        day.append(image);

        let temp = document.createElement('p');
        temp.textContent = 'Temp: ' + results.daily[i].temp.day + 'c';
        day.append(temp);

        let wind = document.createElement('p');
        wind.textContent = 'Wind: ' + results.daily[i].wind_speed + 'km/h';
        day.append(wind);

        let humidity = document.createElement('p');
        humidity.textContent = 'Humidity: ' + results.daily[i].humidity + '%';
        day.append(humidity);

        contain.append(day);
    }
}

function handleSearchResults() {
    let inputVal = document.querySelector('#input').value;

    if (!inputVal) {
        console.error('You need a search input value!');
        return;
    }
    searchApi(inputVal);
}

function setHistory(name) {
    searchHistory.push(name);
    localStorage.setItem("location", JSON.stringify(searchHistory));
}

function getHistoryFromStorage() {
    return JSON.parse(localStorage.getItem("highscores")) || [];
}

function getHistory(){
    let location = getHistoryFromStorage();


}


searchBtn.addEventListener("click", handleSearchResults);