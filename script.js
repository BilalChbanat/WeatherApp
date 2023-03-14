let weather = {
    apiKey: "fe49a1e566e9529212f0a475e5274553",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid="
            + this.apiKey
        ).then((Response) => Response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerHTML = "Weather in " + name;
        document.querySelector(".icon").src = customizeWeatherIcon(icon);
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".temp").innerHTML = temp + " °C";
        document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerHTML = "Wind speed: " + speed + "km/h";
    },
    searchFunction: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }

};

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

// Event listener for city name input
search.addEventListener('input', async () => {
    const cityName = search.value.trim();
    suggestionList.innerHTML = '';

    if (cityName) {
        const url = `https://api.openweathermap.org/data/2.5/find?q=${cityName}&appid=fe49a1e566e9529212f0a475e5274553&units=metric`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === '200' && data.count > 0) {
            const ulsuggestion = document.createElement('ul');

            data.list.forEach(city => {
                const suggestionItem = document.createElement('li');
                suggestionItem.textContent = city.name;
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
            });

            suggestionList.appendChild(ulsuggestion);
        }
    }

});

// Event listener for form submit
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

function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add("active");
}

function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("active");
    }
}
