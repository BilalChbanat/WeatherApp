let weather = {
    apiKey: "fe49a1e566e9529212f0a475e5274553",
    recentSearches: [],
    fetchWeather: function (city) {
        if (this.recentSearches.includes(city)) {
            // If it is, remove it from the array
            const index = this.recentSearches.indexOf(city);
            if (index > -1) {
                this.recentSearches.splice(index, 1);
            }
        }

        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid="
            + this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("City not found");
                }
                return response.json();
            })
            .then((data) => {
                this.displayWeather(data);
                this.recentSearches.push(city);
                this.updateRecentSearches();
            })
            .catch((error) => {
                alert(error.message);
            });
    },

    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerHTML = name;
        document.querySelector(".icon").src = customizeWeatherIcon(icon);
        document.querySelector(".description").innerHTML =
            "Weather status:" + description;
        document.querySelector(".temp").innerHTML = temp + " °C";
        document.querySelector(".humidity").innerHTML =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerHTML =
            "Wind speed: " + speed + "km/h";
    },

    searchFunction: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
    updateRecentSearches: function () {
        const searchesList = document.querySelector(".search-history");
        searchesList.innerHTML = "";
        for (let i = this.recentSearches.length - 1; i >= 0; i--) {
            const listItem = document.createElement("li");
            const listicon = document.createElement("img");

            const weatherCondition = this.recentSearches[i];
            listItem.innerText = weatherCondition;

            fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" +
                weatherCondition +
                "&units=metric&appid=" +
                this.apiKey
            )
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("City not found");
                    }
                    return response.json();
                })
                .then((data) => {
                    const { icon } = data.weather[0];
                    const { temp } = data.main;

                    listicon.src = customizeWeatherIcon(icon);
                    listicon.classList.add("icon-latest");
                    listItem.innerHTML = `<span class="weatherCon">${weatherCondition} </span>  <span class="tempSeg">${temp}&#176;C </span>`;
                    const containerLatest = document.createElement("div");
                    containerLatest.classList.add("containerLatest");
                    listItem.prepend(listicon);
                    containerLatest.prepend(listItem)

                    listItem.addEventListener("click", () => {
                        this.fetchWeather(weatherCondition);
                    });

                    searchesList.appendChild(listItem);
                })
                .catch((error) => {
                    alert(error.message);
                });
        }
    },



};
const cardforecast = document.getElementById("cardforecastt");

async function getWeatherForecast(city) {
    const API_KEY = 'fe49a1e566e9529212f0a475e5274553';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    const forecast = data.list && data.list.slice(0, 3); // check if data.list exists

    const cardContainer = document.querySelector('#weather-cards');
    cardContainer.innerHTML = '';

    forecast && forecast.forEach(hour => { // check if forecast exists
        const time = new Date(hour.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const icon = `https://openweathermap.org/img/w/${hour.weather[0].icon}.png`;
        const temp = Math.round(hour.main.temp);

        const card = document.createElement('div');
        card.classList.add('card-forecast');

        const timeEl = document.createElement('div');
        timeEl.textContent = time;
        timeEl.classList.add('time');
        card.appendChild(timeEl);

        const iconEl = document.createElement('img');
        iconEl.src = icon;
        iconEl.classList.add('iconEl');
        card.appendChild(iconEl);

        const tempEl = document.createElement('div');
        tempEl.textContent = `${temp}°C`;
        tempEl.classList.add('tempEl');
        card.appendChild(tempEl);

        cardContainer.appendChild(card);
    });
}

const form = document.querySelector('.search-button');
const input = document.querySelector('#city-input');

form.addEventListener('click', event => {
    event.preventDefault();
    const city = input.value;
    getWeatherForecast(city);
});
async function getForecast(city) {
    const API_KEY = 'fe49a1e566e9529212f0a475e5274553';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const forecasts = [];

        for (let i = 0; i < data.list.length; i++) {
            const date = new Date(data.list[i].dt_txt);
            const day = date.getDay();

            if (day === new Date().getDay() && forecasts.length === 0) {
                forecasts.push({ date: 'Today', temperature: data.list[i].main.temp, icon: data.list[i].weather[0].icon });
            } else if (day === new Date().getDay() + 1 && forecasts.length === 1) {
                forecasts.push({ date: 'Tomorrow', temperature: data.list[i].main.temp, icon: data.list[i].weather[0].icon });
            } else if (day === new Date().getDay() + 2 && forecasts.length === 2) {
                forecasts.push({ date: 'Day after tomorrow', temperature: data.list[i].main.temp, icon: data.list[i].weather[0].icon });
                break;
            }
        }

        return forecasts;
    } catch (error) {
        console.error(error);
    }
}

form.addEventListener('click', async event => {
    event.preventDefault();
    const city = input.value;
    const forecasts = await getForecast(city);
    const forecastContainer = document.querySelector('.forecast-container');
    forecastContainer.innerHTML = '';

    forecasts.forEach(forecast => {
        const forecastDiv = document.createElement('div');
        forecastDiv.classList.add("week-forecast");
        const dateDiv = document.createElement('div');
        dateDiv.classList.add("date-week");
        const iconImg = document.createElement('img');
        iconImg.classList.add("iconEl");
        const tempDiv = document.createElement('div');
        tempDiv.classList.add("temp-week");

        dateDiv.textContent = forecast.date;
        iconImg.src = `https://openweathermap.org/img/w/${forecast.icon}.png`;
        tempDiv.textContent = `${forecast.temperature} °C`;

        forecastDiv.appendChild(dateDiv);
        forecastDiv.appendChild(iconImg);
        forecastDiv.appendChild(tempDiv);

        forecastContainer.appendChild(forecastDiv);
    });
});

async function showMalagaWeather() {
    const apiKey = 'fe49a1e566e9529212f0a475e5274553';
    const city = 'Malaga';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const cityNameEl = document.querySelector('.cityNmae-more-suggetions');
        cityNameEl.textContent = data.name;

        const iconEl = document.querySelector('.iconEl');
        iconEl.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

        const tempEl = document.querySelector('.temp-more-suggtions');
        tempEl.textContent = `${data.main.temp}°C`;
    } catch (error) {
        console.log(error);
    }
}

showMalagaWeather()
async function showMadridWeather() {
    const apiKey = 'fe49a1e566e9529212f0a475e5274553';
    const city = 'Madrid';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const cityNameEl = document.querySelector('.cityNmae-more-suggetions1');
        cityNameEl.textContent = data.name;

        const iconEl = document.querySelector('.iconEl1');
        iconEl.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

        const tempEl = document.querySelector('.temp-more-suggtions1');
        tempEl.textContent = `${data.main.temp}°C`;
    } catch (error) {
        console.log(error);
    }
}

showMadridWeather()
async function showMarrakechWeather() {
    const apiKey = 'fe49a1e566e9529212f0a475e5274553';
    const city = 'Marrakech';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const cityNameEl = document.querySelector('.cityNmae-more-suggetions2');
        cityNameEl.textContent = data.name;

        const iconEl = document.querySelector('.iconEl2');
        iconEl.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

        const tempEl = document.querySelector('.temp-more-suggtions2');
        tempEl.textContent = `${data.main.temp}°C`;
    } catch (error) {
        console.log(error);
    }
}

showMarrakechWeather()


function loadRecentSearches() {
    weather.recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    weather.updateRecentSearches();
}

const searchButton = document.querySelector(".search-btn");
if (searchButton) {
    searchButton.addEventListener("click", function () {
        const searchInput = document.querySelector(".search-bar");
        const searchQuery = searchInput.value;
        weather.fetchWeather(searchQuery);
        searchInput.value = "";
        localStorage.setItem("recentSearches", JSON.stringify(weather.recentSearches));
    });
}



window.addEventListener("load", loadRecentSearches);



function customizeWeatherIcon(icon) {
    switch (icon) {
        case "01d":
            return "https://i.ibb.co/rb4rrJL/26.png"; // sunny day
        case "01n":
            return "https://i.ibb.co/1nxNGHL/10.png"; // clear night
        case "02d":
        case "02n":
        case "03d":
        case "03n":
        case "04d":
        case "04n":
            return "https://cdn-icons-png.flaticon.com/512/2042/2042088.png"; // clouds
        case "09d":
        case "09n":
        case "10d":
        case "10n":
            return "https://i.ibb.co/kBd2NTS/39.png"; // rain
        case "11d":
        case "11n":
            return "https://static.vecteezy.com/system/resources/previews/008/854/783/original/thunderstorm-sun-icon-weather-forecast-meteorological-sign-3d-render-png.png"; // thunderstorm
        case "13d":
        case "13n":
            return "https://static.vecteezy.com/system/resources/previews/012/806/416/original/3d-cartoon-weather-icon-snow-clouds-and-snowflakes-sign-isolated-on-transparent-background-3d-render-illustration-png.png"; // snow
        case "50d":
        case "50n":
            return "https://cdn-icons-png.flaticon.com/512/4005/4005901.png"; // mist/fog
        default:
            return "https://icons.veryicon.com/png/o/business/linear-monochrome-weather-icon/unknown-weather.png"; // unknown weather condition
    }
}

document.querySelector(".search-button").addEventListener("click", function () {
    weather.searchFunction();
    search.value = "";
})

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.searchFunction();
        search.value = "";
    }
})


const search = document.querySelector("#city-input");



var currentFocus;

async function handleCityInput() {
    const cityName = cityInput.value.trim();
    suggestionList.innerHTML = '';

    if (cityName) {
        const data = await getWeatherData(cityName);
        if (data.cod === 200) {
            displayWeather(data);
        } else {
            alert(data.message);
        }
    }
}

const suggestionList = document.getElementById("suggestions");


search.addEventListener('input', async () => {
    const cityName = search.value.trim();
    suggestionList.innerHTML = '';
    const addedCities = {};

    if (cityName) {
        const url = `https://api.openweathermap.org/data/2.5/find?q=${cityName}&appid=fe49a1e566e9529212f0a475e5274553&units=metric`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === '200' && data.count > 0) {
            const ulsuggestion = document.createElement('ul');

            data.list.forEach(city => {
                if (!addedCities[city.name.toLowerCase()]) { // check if city has not been added before
                    const suggestionItem = document.createElement('li');
                    const suggestionImg = document.createElement('img');
                    suggestionImg.src = customizeWeatherIcon(city.weather[0].icon); // get the weather icon for the city
                    suggestionItem.textContent = city.name;
                    suggestionItem.appendChild(suggestionImg); // add the weather icon to the suggestion item
                    suggestionItem.addEventListener('click', () => {
                        search.value = city.name;
                        suggestionList.innerHTML = '';
                        displayWeather(city.name)
                            .then(data => {
                                displayWeather(data);
                            })
                            .catch(error => {
                                alert(error.message);
                            });
                    });

                    ulsuggestion.appendChild(suggestionItem);
                    addedCities[city.name.toLowerCase()] = true;
                }
            });

            suggestionList.appendChild(ulsuggestion);
        }
    }
});


document.getElementById('search-button').addEventListener('submit', event => {
    event.preventDefault();
    handleCityInput();
});



search.addEventListener("keydown", function (e) {
    var x = document.getElementById("suggestionsList");
    if (x) x = x.getElementsByTagName("li");
    if (e.keyCode == 40) {
        currentFocus++;
        addActive(x);
        if (x) {
            x[currentFocus].scrollIntoView(false);
            var elementBottom = x[currentFocus].offsetTop + x[currentFocus].offsetHeight;
            var containerBottom = x[currentFocus].parentNode.offsetHeight;
            if (elementBottom > containerBottom) {
                x[currentFocus].parentNode.scrollTop += x[currentFocus].offsetHeight;
            }
        }
    } else if (e.keyCode == 38) {
        currentFocus--;
        addActive(x);
    }
    if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1) {
            if (x) x[currentFocus].click();
        }
    }
});

