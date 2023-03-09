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
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png"
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".temp").innerHTML = temp + " °C";
        document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerHTML = "Wind speed: " + speed + "km/h";
    },
    searchFunction: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search-button").addEventListener("click", function () {
    weather.searchFunction();
})

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.searchFunction();
    }
})


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
    ///////////////////////////////
    { name: "London" },
    { name: "Istanbul" },
    { name: "Rome" },
    { name: "Amsterdam" },
    { name: "Barcelona" },
    { name: "milan" },
    { name: "seoul" },
    { name: "osaka" },
    { name: "pattaya" },
    ///////////////////////////////
    { name: "bali" },
    { name: "bangkok" },
    { name: "dubai" },
    { name: "makkah" },
    { name: "FLORENCE" },
    { name: "Rhodes" },
    { name: "Porto" },
    { name: "Nice" },
    { name: "Stockholm" },
    ///////////////////////////////
    { name: "Frankfurt" },
    { name: "Warsaw" },
    { name: "Kraków" },
    { name: "Heraklion" },
    { name: "Copenhagen" },
    { name: "Lisbon" },
    { name: "Budapest" },
    { name: "Munich" },
    { name: "Brussels" },
    ///////////////////////////////
    { name: "Saint Petersburg" },
    { name: "Florence" },
    { name: "Dublin" },
    { name: "Venice" },
    { name: "Moscow" },
    { name: "Berlin" },
    { name: "Athens" },
    { name: "Vienna" },
    { name: "Amsterdam" },
    ///////////////////////////////
    { name: "Prague" },
    { name: "Antalya" },
    { name: "Antalya" },
    { name: "Miami" },
    { name: "Los Angeles" },
    { name: "Orlando" },
    { name: "San Francisco" },
    { name: "Las Vegas" },
    { name: "Honolulu " },
    ///////////////////////////////
    { name: "Washington" },
    { name: "Boston" },
    { name: "Chicago" },
    { name: "Vancouver" },
    { name: "Toronto" },
    { name: "Montreal" },
    { name: "Hong Kong" },
    { name: "Ottawa" },
    { name: "Quebec" },
    ///////////////////////////////

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

