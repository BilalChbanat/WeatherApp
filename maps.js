function displayCityTemperatures() {
    // Define an array of city names and their corresponding latitudes and longitudes
    const cities = [
        { name: "Algiers", lat: 36.7538, long: 3.0588 },
        { name: "Luanda", lat: -8.8391, long: 13.2894 },
        { name: "Porto-Novo", lat: 6.4968, long: 2.6283 },
        { name: "Gaborone", lat: -24.6282, long: 25.9231 },
        { name: "Ouagadougou", lat: 12.3714, long: -1.5197 },
        { name: "Bujumbura", lat: -3.3818, long: 29.3622 },
        { name: "Yaounde", lat: 3.848, long: 11.5021 },
        { name: "Praia", lat: 14.933, long: -23.5133 },
        { name: "Bangui", lat: 4.3947, long: 18.5582 },
        { name: "N'Djamena", lat: 12.1342, long: 15.0557 },
        { name: "Moroni", lat: -11.7172, long: 43.2476 },
        { name: "Kinshasa", lat: -4.4419, long: 15.2663 },
        { name: "Brazzaville", lat: -4.2634, long: 15.2429 },
        { name: "Yamoussoukro", lat: 6.8276, long: -5.2893 },
        { name: "Djibouti", lat: 11.589, long: 43.145 },
        { name: "Cairo", lat: 30.0444, long: 31.2357 },
        { name: "Malabo", lat: 3.7523, long: 8.7815 },
        { name: "Asmara", lat: 15.3229, long: 38.925 },
        { name: "Addis Ababa", lat: 9.0054, long: 38.7636 },
        { name: "Libreville", lat: 0.3858, long: 9.4496 },
        { name: "Banjul", lat: 13.4531, long: -16.5775 },
        { name: "Accra", lat: 5.6037, long: -0.187 },
        { name: "Conakry", lat: 9.6412, long: -13.5784 },
        { name: "Bissau", lat: 11.8636, long: -15.5977 },
        { name: "Nairobi", lat: -1.2921, long: 36.8219 },
        { name: "Maseru", lat: -29.3167, long: 27.4833 },
        { name: "Monrovia", lat: 6.3005, long: -10.7969 },
        { name: "Tripoli", lat: 32.8872, long: 13.1913 },
        { name: "Antananarivo", lat: -18.8792, long: 47.5079 },
        { name: "Lilongwe", lat: -13.9626, long: 33.7741 },
        { name: "Madrid", lat: 40.4168, long: -3.7038 },
        { name: "Paris", lat: 48.8566, long: 2.3522 },
        { name: "Berlin", lat: 52.5200, long: 13.4050 },
        { name: "Rome", lat: 41.9028, long: 12.4964 },
        { name: "Amsterdam", lat: 52.3676, long: 4.9041 },
        { name: "Lisbon", lat: 38.7223, long: -9.1393 },
        { name: "Vienna", lat: 48.2082, long: 16.3738 },
        { name: "Stockholm", lat: 59.3293, long: 18.0686 },
        { name: "Athens", lat: 37.9838, long: 23.7275 },
        { name: "Dublin", lat: 53.3498, long: -6.2603 },
        { name: "Oslo", lat: 59.9139, long: 10.7522 },
        { name: "Copenhagen", lat: 55.6761, long: 12.5683 },
        { name: "Helsinki", lat: 60.1699, long: 24.9384 },
        { name: "Brussels", lat: 50.8503, long: 4.3517 },
        { name: "Ljubljana", lat: 46.0569, long: 14.5058 },
        { name: "Warsaw", lat: 52.2297, long: 21.0122 },
        { name: "Budapest", lat: 47.4979, long: 19.0402 },
        { name: "Prague", lat: 50.0755, long: 14.4378 },
        { name: "Bratislava", lat: 48.1486, long: 17.1077 },
        { name: "Riga", lat: 56.9496, long: 24.1052 },
        { name: "Vilnius", lat: 54.6872, long: 25.2797 },
        { name: "Tallinn", lat: 59.4370, long: 24.7536 },
        { name: "Bucharest", lat: 44.4268, long: 26.1025 },
        { name: "Sofia", lat: 42.6977, long: 23.3219 },
        { name: "Zagreb", lat: 45.8150, long: 15.9819 },
        { name: "Belgrade", lat: 44.7872, long: 20.4573 },
        { name: "Skopje", lat: 41.9965, long: 21.4314 },
        { name: "Podgorica", lat: 42.4304, long: 19.2594 },
        { name: "Sarajevo", lat: 43.8564, long: 18.4131 },
        { name: "Tokyo", lat: 35.6895, long: 139.6917 },
        { name: "Beijing", lat: 39.9042, long: 116.4074 },
        { name: "Seoul", lat: 37.5665, long: 126.9780 },
        { name: "New Delhi", lat: 28.6139, long: 77.2090 },
        { name: "Jakarta", lat: -6.2146, long: 106.8451 },
        { name: "Islamabad", lat: 33.6844, long: 73.0479 },
        { name: "Kathmandu", lat: 27.7172, long: 85.3240 },
        { name: "Hanoi", lat: 21.0278, long: 105.8342 },
        { name: "Phnom Penh", lat: 11.5564, long: 104.9282 },
        { name: "Bangkok", lat: 13.7563, long: 100.5018 },
        { name: "Manila", lat: 14.5995, long: 120.9842 },
        { name: "Taipei", lat: 25.0330, long: 121.5654 },
        { name: "Doha", lat: 25.2854, long: 51.5310 },
        { name: "Tehran", lat: 35.6892, long: 51.3890 },
        { name: "Riyadh", lat: 24.7136, long: 46.6753 },
        { name: "Abu Dhabi", lat: 24.4539, long: 54.3773 },
        { name: "Amman", lat: 31.9566, long: 35.9452 },
        { name: "Jerusalem", lat: 31.7683, long: 35.2137 },
        { name: "Astana", lat: 51.1605, long: 71.4704 },
        { name: "Tbilisi", lat: 41.7151, long: 44.8271 },
        { name: "Yerevan", lat: 40.1872, long: 44.5152 },
        { name: "Baku", lat: 40.4093, long: 49.8671 },
        { name: "Ashgabat", lat: 37.9601, long: 58.3261 },
        { name: "Tashkent", lat: 41.2995, long: 69.2401 },
        { name: "Kuala Lumpur", lat: 3.1390, long: 101.6869 },
        { name: "Singapore", lat: 1.3521, long: 103.8198 },
        { name: "Manama", lat: 26.2285, long: 50.5860 },
        { name: "Male", lat: 4.1750, long: 73.5093 },
        { name: "Dushanbe", lat: 38.5868, long: 68.7800 },
        { name: "Rabat", lat: 33.9715904, long: -6.8498129 },
        { name: "Ankara", lat: 39.9334, long: 32.8597 },
        { name: "Tehran", lat: 35.6892, long: 51.3890 },
        { name: "Riyadh", lat: 24.7136, long: 46.6753 },
        { name: "Baghdad", lat: 33.3128, long: 44.3615 },
        { name: "Jerusalem", lat: 31.7683, long: 35.2137 },
        { name: "Ottawa", lat: 45.4215, long: -75.6972 },
        { name: "Washington D.C.", lat: 38.9072, long: -77.0369 },
        { name: "Mexico City", lat: 19.4326, long: -99.1332 },
        { name: "Guatemala City", lat: 14.6248, long: -90.5328 },
        { name: "San Salvador", lat: 13.6929, long: -89.2182 },
        { name: "Tegucigalpa", lat: 14.081, long: -87.2068 },
        { name: "Managua", lat: 12.1364, long: -86.2514 },
        { name: "San Jose", lat: 9.9281, long: -84.0907 },
        { name: "Panama City", lat: 8.9824, long: -79.5199 },
        { name: "Bogota", lat: 4.711, long: -74.0721 },
        { name: "Quito", lat: -0.1807, long: -78.4678 },
        { name: "Lima", lat: -12.0464, long: -77.0428 },
        { name: "La Paz", lat: -16.4897, long: -68.1193 },
        { name: "Brasilia", lat: -15.7942, long: -47.8822 },
        { name: "Santiago", lat: -33.4489, long: -70.6693 },
        { name: "Buenos Aires", lat: -34.6037, long: -58.3816 },
        { name: "Montevideo", lat: -34.9011, long: -56.1645 },
        { name: "Asuncion", lat: -25.2637, long: -57.5759 },
        { name: "Paramaribo", lat: 5.852, long: -55.2038 },
        { name: "Georgetown", lat: 6.8013, long: -58.1551 },
        { name: "Port-au-Prince", lat: 18.5944, long: -72.3074 }
    ];

    // Initialize the map
    const map = L.map("map").setView([48.8566, 2.3522], 4);

    // Add the map tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18
    }).addTo(map);

    // Loop through the array of cities and add a marker for each one
    cities.forEach(city => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.long}&appid=fe49a1e566e9529212f0a475e5274553&units=metric`;

        // Fetch the current weather data for the city
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Get the temperature in Celsius
                const tempCelsius = data.main.temp.toFixed(1);

                // Create a marker for the city with a popup showing the temperature
                const marker = L.marker([city.lat, city.long]).addTo(map);
                marker.bindPopup(`${city.name}: ${tempCelsius}°C`);
            })
            .catch(error => console.error(error));
    });
}

displayCityTemperatures()
