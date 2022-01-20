const searchBtn = $('#search-button');
let locationEL = $('#location');

function searchApi(query, format) {

    let initialUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + query + '&units=metric&appid=fe4edba997563cd1cffd343bf3a1a5ff';
    let lon;
    let lat;
    fetch(initialUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (data) {
            lat = data.coord.lat;
            lon = -34.93 // data.coord.lon;
            console.log(lat);
            console.log(lon);
        })
        let weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ lat +'&lon=' + lon + '&units=metric&appid=fe4edba997563cd1cffd343bf3a1a5ff';
    fetch(weatherUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (data) {
            printResults(data);
        })

}
function printResults(results) {
    console.log(results);

    let title = document.createElement('h2');
    title.textContent = results.name;

    let temp = document.createElement('p');
    temp.textContent = results.main.temp + 'C';

    let wind = document.createElement('p');
    wind.textContent = results.wind.speed + 'KM/H';

    let humidity = document.createElement('p');
    humidity.textContent = results.main.humidity + '%';

    let index = document.createElement('p');
    index.textContent = results.

        locationEL.append(title);

}

function handleSearchResults() {
    let inputVal = document.querySelector('#input').value;

    if (!inputVal) {
        console.error('You need a search input value!');
        return;
    }
    searchApi(inputVal);
    console.log(inputVal);
}








searchBtn.on("click", handleSearchResults);