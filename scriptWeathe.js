let weather = {
    apiKey: "fe49a1e566e9529212f0a475e5274553",
    unit: "metric", // default to Celsius
    fetchForecast: function (city) {
        fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${this.unit}&appid=${this.apiKey}`
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
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${this.unit}&appid=${this.apiKey}`
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
                console.log(error.message);
            });
    },

    displayCurrentWeather: function (data) {
        const cityInfo = document.querySelector(".city-info");
        const humidityInfo = document.querySelector(".humidity-weather-info");
        const tempair = document.querySelector(".temp-of-air");
        const tempInfo = document.querySelector(".temp-weather-info");
        const windspeed = document.querySelector(".temp-of-air-wind");
        const tempaire = document.querySelector(".temp-of-humidity");
        const iconInfo = document.querySelector(".icon");
        const unitToggle = document.querySelector("#fahrenheit");

        cityInfo.innerText = data.name;
        humidityInfo.innerText = `Humidity ${data.main.humidity}%`;
        tempaire.innerText = `${data.main.humidity}%`;
        windspeed.innerText = `${data.wind.speed} km/h`;
        const tempInCelsius = data.main.temp;
        const tempInFahrenheit = (tempInCelsius * 9 / 5) + 32;
        let currentTemp = tempInCelsius;
        let unit = "C";
        if (this.unit === "imperial") {
            currentTemp = tempInFahrenheit;
            unit = "F";
        }
        tempInfo.innerText = `${currentTemp.toFixed(0)}°${unit}`;
        tempair.innerText = `${currentTemp.toFixed(0)}°${unit}`;
        iconInfo.setAttribute("src", customizeWeatherIcon(data.weather[0].icon));

        // add event listener to unit toggle button
        unitToggle.addEventListener("click", () => {
            if (this.unit === "metric") {
                this.unit = "imperial";
                currentTemp = tempInFahrenheit;
                unit = "F";
            } else {
                this.unit = "metric";
                currentTemp = tempInCelsius;
                unit = "C";
            }
            tempInfo.innerText = `${currentTemp.toFixed(0)}°${unit}`;
            tempair.innerText = `${currentTemp.toFixed(0)}°${unit}`;
            this.fetchCurrentWeather(data.name); // re-fetch weather data with new unit
            this.fetchForecast(data.name); // re-fetch forecast data
        })
    },

    displayForecast: function (dailyForecasts) {
        let isFahrenheit = false; // default to Celsius

        const forecastContainer = document.querySelector(".weekend-forecast");

        // clear old forecasts
        forecastContainer.innerHTML = "";

        isFahrenheit = false; // default to Celsius

        // check if the temperature unit should be changed to Fahrenheit
        const changeUnitBtn = document.querySelector(".unit-toggle");
        if (changeUnitBtn) {
            changeUnitBtn.addEventListener("click", function () {
                isFahrenheit = !isFahrenheit;
                // re-render forecast with the new temperature unit
                displayForecast(dailyForecasts);
            });
        }

        for (let i = 0; i < dailyForecasts.length; i++) {
            const forecast = dailyForecasts[i];
            const forecastElement = document.createElement("div");
            forecastElement.classList.add("forecast-all-days-week");

            // convert temperature to Fahrenheit if needed
            const temp = isFahrenheit ? (forecast.temp * 9 / 5) + 32 : forecast.temp;

            forecastElement.innerHTML = `
            <div class="div-day${i}name">${this.getDayName(forecast.day)}</div>
            <img src="${this.getWeatherIconUrl(forecast.icon)}" alt="">
            <div class="descr-forecast">${forecast.description}</div>
            <div class="dateforecastoweek">${temp.toFixed(0)}${isFahrenheit ? '°F' : '°C'}</div>
          `;
            forecastContainer.appendChild(forecastElement);
        }
    },



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
    getWeatherForecast(city);
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


function getWeatherForecast(city) {
    const apiKey = 'fe49a1e566e9529212f0a475e5274553'; // replace with your OpenWeatherMap API key
    const unitToggle = document.querySelector(".unit-toggle");
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&q=${city}`;
    // add event listener to unit toggle button
    unitToggle.addEventListener("click", () => {
        if (this.unit === "metric") {
            this.unit = "imperial";
        } else {
            this.unit = "metric";
        }
        this.fetchCurrentWeather(data.name); // re-fetch weather data with new unit
        this.fetchForecast(data.name); // re-fetch forecast data
    })

    // replace YOUR_LOCATION_HERE with the location you want to get weather for

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const forecast = data.list.slice(0, 6); // get the first 6 items in the list (next 6 hours)

            // display the forecast
            const allDayForecastElement = document.querySelector('.all-day-forecast');
            allDayForecastElement.innerHTML = `
                    ${forecast.map(item => {
                const date = new Date(item.dt * 1000); // convert Unix timestamp to JS Date object
                const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // format time as HH:MM
                const temp = Math.round(item.main.temp - 273.15); // convert temperature from Kelvin to Celsius
                const desc = item.weather[0].description;
                const iconUrl = `https://openweathermap.org/img/w/${item.weather[0].icon}.png`; // get the URL of the weather icon

                return `        
                <div class="div-card-forecast-info">
                                <div class="clock">${time}</div>
                                <div class="div-forecast-info-icon"><img src="${iconUrl}" alt="${desc}"></div>
                                <div class="temp-of-day-info">${temp}°C</div>
                                </div>`;
            }).join('')}
                
            `;
        })
        .catch(error => console.error(error));
}



async function getUVIndex(apiKey, lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.value;
}

async function main() {
    const apiKey = 'fe49a1e566e9529212f0a475e5274553';
    const cityInput = document.querySelector('.search-bar');
    const submitButton = document.querySelector('#search-button');

    submitButton.addEventListener('click', async () => {
        const city = cityInput.value;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        const lat = data.coord.lat;
        const lon = data.coord.lon;
        const uvIndex = await getUVIndex(apiKey, lat.toString(), lon.toString());

        const uvindex = document.querySelector(".temp-of-air-uvindex");
        uvindex.innerText = uvIndex;
    });
}

main();
