async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) {
        document.getElementById("weatherResult").innerHTML = "Please enter a city.";
        return;
    }
    const apiKey = "aa287ae09ed2486786772935251502";
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city},India&aqi=yes`;
    const weatherDiv = document.getElementById("weatherResult");
    const lastUpdated = document.getElementById("lastUpdated");
    
    weatherDiv.innerHTML = "Loading...";
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.error) {
            weatherDiv.innerHTML = `Error: ${data.error.message}`;
            lastUpdated.innerText = "";
            return;
        }
        const { location, current } = data;
        weatherDiv.innerHTML = `
            <h3>${location.name}, ${location.region}</h3>
            <p>🌡 Temperature: ${current.temp_c}°C</p>
            <p>☁ Condition: ${current.condition.text}</p>
            <img src="${current.condition.icon}" alt="Weather Icon">
            <p>💨 AQI: ${current.air_quality["us-epa-index"]}</p>
        `;
        lastUpdated.innerText = `Last Updated: ${current.last_updated}`;
    } catch (error) {
        weatherDiv.innerHTML = "Error fetching data!";
        lastUpdated.innerText = "";
    }
}