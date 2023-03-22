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
                // Push the city into the recentSearches array
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
            listItem.innerText = this.recentSearches[i];
            listItem.addEventListener("click", () => {
                this.fetchWeather(this.recentSearches[i]);
            });
            searchesList.appendChild(listItem);
        }
    },

};
const cardforecast = document.getElementById("cardforecastt");

/////////////////////////////////////////



async function getWeatherForecast(city) {
    const API_KEY = 'fe49a1e566e9529212f0a475e5274553';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    const forecast = data.list.slice(0, 3);
    console.log(`Weather forecast for ${city} in the next 3 hours:`);

    const cardContainer = document.querySelector('#weather-cards');
    cardContainer.innerHTML = '';

    forecast.forEach(hour => {
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

const submitBtn = document.querySelector('#search-button');
submitBtn.addEventListener('click', () => {
    const cityInput = document.querySelector('#search-bar');
    const city = cityInput.value;
    getWeatherForecast(city);
});




////////////////////////////////////////

// Call this function when the page loads to populate the Recent Searches list
function loadRecentSearches() {
    weather.recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    weather.updateRecentSearches();
}

// Save the recent searches to local storage whenever a new search is made
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



// Call the loadRecentSearches function when the page loads
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



// function removeSuggestions() {
//     var x = document.getElementById("suggestionsList");
//     if (x) x.parentNode.removeChild(x);
// }
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

