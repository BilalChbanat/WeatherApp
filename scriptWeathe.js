let weather = {
    apiKey: "fe49a1e566e9529212f0a475e5274553",
    fetchForecast: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/forecast?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("City not found :\\");
                }
                return response.json();
            })
            .then((data) => {

                const dailyForecasts = this.getDailyForecasts(data.list);
                this.displayForecast(dailyForecasts);

            })
            .catch((error) => {
                console.log(error.message);
            });
    },

    getDailyForecasts: function (forecastList) {
        const dailyForecasts = [];
        let currentDate = null;

        for (const forecast of forecastList) {
            const forecastDate = new Date(forecast.dt_txt).toLocaleDateString();
            const forecastDay = new Date(forecast.dt_txt).getDay();

            if (currentDate === null || forecastDate !== currentDate) {
                currentDate = forecastDate;
                dailyForecasts.push({
                    day: forecastDay,
                    date: forecastDate,
                    icon: forecast.weather[0].icon,
                    description: forecast.weather[0].description,
                    temp: forecast.main.temp,
                });
            }
        }

        return dailyForecasts;
    },

    fetchCurrentWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("City not found :\\");
                }
                return response.json();
            })
            .then((data) => {
                this.displayCurrentWeather(data);
            })
            .catch((error) => {
                alert(error.message);
            });
    },

    displayCurrentWeather: function (data) {
        const cityInfo = document.querySelector(".city-info");
        const humidityInfo = document.querySelector(".humidity-weather-info");
        const tempInfo = document.querySelector(".temp-weather-info");
        const iconInfo = document.querySelector(".icon");

        cityInfo.innerText = data.name;
        humidityInfo.innerText = "Humidity " + data.main.humidity + "%";
        tempInfo.innerText = data.main.temp.toFixed(0) + "°C";
        iconInfo.setAttribute("src", customizeWeatherIcon(data.weather[0].icon));
    },

    // displayForecast: function (dailyForecasts) {
    //     const forecastContainer = document.querySelector(".weekend-forecast");

    //     for (let i = 0; i < dailyForecasts.length; i++) {
    //         const forecast = dailyForecasts[i];
    //         const forecastElement = document.createElement("div");
    //         forecastElement.classList.add("forecast-all-days-week");
    //         forecastElement.innerHTML = `
    //       <div class="div-day${i}name">${this.getDayName(forecast.day)}</div>
    //       <img src="${this.getWeatherIconUrl(forecast.icon)}" alt="">
    //       <div class="descr-forecast">${forecast.description}</div>
    //       <div class="dateforecastoweek">${forecast.temp.toFixed(0)}°C</div>
    //     `;
    //         forecastContainer.appendChild(forecastElement);
    //     }
    // },

    getDayName: function (dayIndex) {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return days[dayIndex];
    },

    getWeatherIconUrl: function (iconCode) {
        return `https://openweathermap.org/img/w/${iconCode}.png`;
    },

};

// Call fetchForecast() with the desired city name to display the forecast

const inputElement = document.querySelector(".search-bar");
const formElement = document.querySelector(".search-button");
formElement.addEventListener("click", (event) => {
    event.preventDefault();
    const city = inputElement.value;
    weather.fetchCurrentWeather(city);
    weather.fetchForecast(city);
});


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

function fetch6hForecast(city) {
    const apiKey = "fe49a1e566e9529212f0a475e5274553";
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("City not found :\\");
            }
            return response.json();
        })
        .then((data) => {
            const forecasts = data.list.filter((forecast) => {
                // Get the date and time for the current forecast
                const forecastTime = new Date(forecast.dt_txt);
                const forecastHour = forecastTime.getHours();
                const forecastMinutes = forecastTime.getMinutes();

                // Get the date and time for the next 6 hours
                const currentTime = new Date();
                const next6hTime = new Date(currentTime.getTime() + 6 * 60 * 60 * 1000);
                const next6hHour = next6hTime.getHours();

                // Check if the current forecast is within the next 6 hours
                return forecastHour >= next6hHour;
            });

            // Update the HTML for each forecast
            forecasts.forEach((forecast, index) => {
                const forecastTime = new Date(forecast.dt_txt);
                const forecastHour = forecastTime.getHours();
                const forecastMinutes = forecastTime.getMinutes();
                const iconUrl = customizeWeatherIcon(forecast.weather[0].icon);
                const temperature = Math.round(forecast.main.temp);

                // Update the HTML for the current forecast card
                const card = document.getElementsByClassName("div-card-forecast-info")[index];
                card.querySelector(".clock").textContent = `${forecastHour}:${forecastMinutes < 10 ? '0' + forecastMinutes : forecastMinutes}`;
                card.querySelector(".f-icon").src = iconUrl;
                card.querySelector(".temp-of-day-info").textContent = `${temperature}°`;
            });
        })
        .catch((error) => {
            console.log(error.message);
        });
}


fetch6hForecast("New York");


