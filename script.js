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

// search.addEventListener("input", function (e, city) {
//     removeSuggestions();
//     var a, b, i, z, val = this.value;
//     if (!val) {
//         return false;
//     }
//     currentFocus = -1;
//     a = document.createElement("ul");
//     a.setAttribute("id", "suggestionsList");
//     z = document.querySelector("#suggestions")
//     z.appendChild(a)
//     this.parentNode.appendChild(a);
//     const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + $city + "&units=metric&appid=" + apiKey;
//     fetch(apiUrl + val)
//         .then(response => response.json())
//         .then(data => {
//             data.forEach(city => {
//                 b = document.createElement("li");
//                 b.innerHTML =
//                     "<strong>" + city.name.substr(0, val.length) + "</strong>";
//                 b.innerHTML += city.name.substr(val.length);
//                 b.innerHTML += "<input type='hidden' value='" + city.name + "'>";
//                 b.addEventListener("click", function (e) {
//                     search.value = this.getElementsByTagName("input")[0].value;
//                     removeSuggestions();
//                 });

//                 a.appendChild(b);
//             });
//         });
// });
async function suggestCities(query, api_key) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${api_key}`;
    const response = await fetch(url);
    if (response.ok) {
        const results = await response.json();
        const cities = results.map(result => result.name);
        return cities;
    } else {
        return [];
    }
}


function removeSuggestions() {
    var x = document.getElementById("suggestionsList");
    if (x) x.parentNode.removeChild(x);
}


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
