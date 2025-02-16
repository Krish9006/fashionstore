async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) {
        document.getElementById("weatherResult").innerHTML = "Please enter a city.";
        return;
    }

    // Construct the URL for the wttr.in API
    const url = `https://wttr.in/${city}?format=j1`;

    const weatherDiv = document.getElementById("weatherResult");
    const lastUpdated = document.getElementById("lastUpdated");

    weatherDiv.innerHTML = "Loading...";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Extract relevant weather information from the JSON response
        const currentCondition = data.current_condition[0];
        const location = data.nearest_area[0];

        weatherDiv.innerHTML = `
            <h3>${location.areaName[0].value}, ${location.region[0].value}</h3>
            <p>🌡 Temperature: ${currentCondition.temp_C}°C</p>
            <p>☁ Condition: ${currentCondition.weatherDesc[0].value}</p>
            <img src="${currentCondition.weatherIconUrl[0].value}" alt="Weather Icon">
            <p>💨 Wind: ${currentCondition.windspeedKmph} km/h</p>
            <p>💧 Humidity: ${currentCondition.humidity}%</p>
        `;

        // Update the last updated time
        lastUpdated.innerText = `Last Updated: ${currentCondition.localObsDateTime}`;
    } catch (error) {
        weatherDiv.innerHTML = `Error fetching data: ${error.message}`;
        lastUpdated.innerText = "";
    }
}