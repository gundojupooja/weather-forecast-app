const API_KEY = "cdcfa5f6bad07351b40fe893a28bc199";

async function getWeather() {

    const city = document.getElementById("cityInput").value.trim();
    const error = document.getElementById("error");

    if (city === "") {
        error.textContent = "Please enter a city name!";
        return;
    }

    error.textContent = "";

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
    const errorData = await response.json();
    console.log(errorData);
    error.textContent = errorData.message;
    return;
       }

        const data = await response.json();

        document.getElementById("city").textContent =
            `${data.name}, ${data.sys.country}`;

        document.getElementById("temperature").textContent =
            `${Math.round(data.main.temp)}°C`;

        document.getElementById("description").textContent =
            data.weather[0].description;

        document.getElementById("humidity").textContent =
            `${data.main.humidity}%`;

        document.getElementById("wind").textContent =
            `${data.wind.speed} m/s`;

        const weather = data.weather[0].main;

        const icons = {
            Clear: "☀️",
            Clouds: "☁️",
            Rain: "🌧️",
            Drizzle: "🌦️",
            Thunderstorm: "⛈️",
            Snow: "❄️",
            Mist: "🌫️",
            Fog: "🌫️",
            Haze: "🌫️"
        };

        document.getElementById("icon").textContent =
            icons[weather] || "🌤️";

    } catch (error) {

        document.getElementById("error").textContent =
            "City not found. Please try again.";

    }
}