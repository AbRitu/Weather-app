const apiKey = "4f5419d931c0efb659c7def4bb836b88";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        // Ensure the city is URL-encoded to handle spaces and special characters
        const encodedCity = encodeURIComponent(city);
        const response = await fetch(apiUrl + encodedCity + `&appid=${apiKey}`);
        
        // Check if the response is ok (city exists and API call was successful)
        if (!response.ok) {
            throw new Error("invalid City name");
        }
        
        // Parse the JSON data from the response
        const data = await response.json();
        console.log(data);

        // Update the HTML with the city weather details
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        if(data.weather[0].main == "Clouds")
        {
          weatherIcon.src = "clouds.png";
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "clear.png";
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "rain.png";
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "drizzle.png";
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "mist.png";
        }
    } catch (error) {
        console.error(error);
        // If city is not found or there's an error, update UI with an error message
        document.querySelector(".city").innerHTML = "invalid City name";
        document.querySelector(".temp").innerHTML = "-";
        document.querySelector(".humidity").innerHTML = "-";
        document.querySelector(".wind").innerHTML = "-";
    }
}

// Event listener for the search button click
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();  // Ensure that the input is trimmed of extra spaces
    if (city) {
        checkWeather(city);  // Fetch weather data if the city is not empty
    } else {
        document.querySelector(".city").innerHTML = "Please enter a city name";
    }
});
