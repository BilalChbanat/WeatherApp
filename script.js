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
        const customizedIcon = customizeWeatherIcon(icon);
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
function getIcon(condition) {
    if (condition === "partly-cloudy-day") {
        return "https://i.ibb.co/PZQXH8V/27.png";
    } else if (condition === "partly-cloudy-night") {
        return "https://i.ibb.co/Kzkk59k/15.png";
    } else if (condition === "rain") {
        return "https://i.ibb.co/kBd2NTS/39.png";
    } else if (condition === "clear-day") {
        return "https://i.ibb.co/rb4rrJL/26.png";
    } else if (condition === "clear-night") {
        return "https://i.ibb.co/1nxNGHL/10.png";
    } else {
        return "https://i.ibb.co/rb4rrJL/26.png";
    }
}


const cities = [
    { name: "Malaga" },
    { name: "Marrakech" },
    { name: "Rabat" },
    { name: "New York" },
    { name: "Casablanca" },
    { name: "Madrid" },
    { name: "Tokyo" },
    { name: "Multan" },
    { name: "Paris" },
    { name: "London" },
    { name: "Istanbul" },
    { name: "Rome" },
    { name: "Amsterdam" },
    { name: "Barcelona" },
    { name: "milan" },
    { name: "seoul" },
    { name: "osaka" },
    { name: "pattaya" },
    { name: "bali" },
    { name: "bangkok" },
    { name: "dubai" },
    { name: "makkah" },
    { name: "FLORENCE" },
    { name: "Rhodes" },
    { name: "Porto" },
    { name: "Nice" },
    { name: "Stockholm" },
    { name: "Frankfurt" },
    { name: "Warsaw" },
    { name: "Kraków" },
    { name: "Heraklion" },
    { name: "Copenhagen" },
    { name: "Lisbon" },
    { name: "Budapest" },
    { name: "Munich" },
    { name: "Brussels" },
    { name: "Saint Petersburg" },
    { name: "Florence" },
    { name: "Dublin" },
    { name: "Venice" },
    { name: "Moscow" },
    { name: "Berlin" },
    { name: "Athens" },
    { name: "Vienna" },
    { name: "Amsterdam" },
    { name: "Prague" },
    { name: "Antalya" },
    { name: "Antalya" },
    { name: "Miami" },
    { name: "Los Angeles" },
    { name: "Orlando" },
    { name: "San Francisco" },
    { name: "Las Vegas" },
    { name: "Honolulu " },
    { name: "Washington" },
    { name: "Boston" },
    { name: "Chicago" },
    { name: "Vancouver" },
    { name: "Toronto" },
    { name: "Montreal" },
    { name: "Hong Kong" },
    { name: "Ottawa" },
    { name: "Quebec" },
    { name: "Shanghai" },
    { name: "São Paulo" },
    { name: "Mexico City" },
    { name: "Cairo" },
    { name: "Mumbai" },
    { name: "Beijing" },
    { name: "Dhaka" },
    { name: "Osaka" },
    { name: "Karachi" },
    { name: "Buenos Aires" },
    { name: "Chongqing" },
    { name: "Istanbul" },
    { name: "Kolkata" },
    { name: "Manila" },
    { name: "Lagos" },
    { name: "Casablanca" },
    { name: "Rabat" },
    { name: "Fez" },
    { name: "Marrakech" },
    { name: "Tangier" },
    { name: "Agadir" },
    { name: "Meknes" },
    { name: "Oujda" },
    { name: "Kenitra" },
    { name: "Tetouan" },
    { name: "Safi" },
    { name: "Essaouira" },
    { name: "El Jadida" },
    { name: "Nador" },
    { name: "Settat" },
    { name: "Khouribga" },
    { name: "Beni Mellal" },
    { name: "Taza" },
    { name: "Khémisset" },
    { name: "Taourirt" },
    { name: "Berkane" },
    { name: "Ksar El Kebir" },
    { name: "Rio de Janeiro" },
    { name: "Tianjin" },
    { name: "Kinshasa" },
    { name: "Guangzhou" },
    { name: "Los Angeles" },
    { name: "Shenzhen" },
    { name: "Lahore" },
    { name: "Bangalore" },
    { name: "Bogotá" },
    { name: "Jakarta" },
    { name: "Chennai" },
    { name: "Lima" },
    { name: "Bangkok" },
    { name: "Nagoya" },
    { name: "Hyderabad" },
    { name: "Tehran" },
    { name: "Chicago" },
    { name: "Chengdu" },
    { name: "Nanjing" },
    { name: "Wuhan" },
    { name: "Ho Chi Minh City" },
    { name: "Luanda" },
    { name: "Ahmedabad" },
    { name: "Kuala Lumpur" },
    { name: "Xi'an" },
    { name: "Dongguan" },
    { name: "Hangzhou" },
    { name: "Foshan" },
    { name: "Shenyang" },
    { name: "Riyadh" },
    { name: "Baghdad" },
    { name: "Santiago" },
    { name: "Surat" },
    { name: "Suzhou" },
    { name: "Pune" },
    { name: "Harbin" },
    { name: "Toronto" },
    { name: "Dar es Salaam" },
    { name: "Belo Horizonte" },
    { name: "Singapore" },
    { name: "Fukuoka" },
    { name: "Khartoum" },
    { name: "Barcelona" },
    { name: "Johannesburg" },
    { name: "Saint Petersburg" },
    { name: "Qingdao" },
    { name: "Dalian" },
    { name: "Yangon" },
    { name: "Alexandria" },
    { name: "Jinan" },
    { name: "Guadalajara" },
];

const search = document.querySelector("#city-input");


var currentFocus;
search.addEventListener("input", function (e) {
    removeSuggestions();
    var a,
        z,
        b,
        i,
        val = this.value;
    if (!val) {
        return false;
    }
    currentFocus = -1;
    z = document.querySelector("#suggestions")
    a = document.createElement("ul");
    a.setAttribute("id", "suggestionsList");

    this.parentNode.appendChild(a);
    z.appendChild(a)

    for (i = 0; i < cities.length; i++) {
        if (
            cities[i].name.substr(0, val.length).toUpperCase() == val.toUpperCase()
        ) {
            b = document.createElement("li");
            b.innerHTML =
                "<strong>" + cities[i].name.substr(0, val.length) + "</strong>";
            b.innerHTML += cities[i].name.substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + cities[i].name + "'>";
            b.addEventListener("click", function (e) {
                search.value = this.getElementsByTagName("input")[0].value;
                removeSuggestions();
            });

            a.appendChild(b);
        }
    }
});

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
