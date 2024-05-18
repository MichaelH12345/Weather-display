document.addEventListener("DOMContentLoaded", function() {
    const apiKey = "c2833fc42c32696641d680c030b432b4"; // Your API key
    const city = "Dearham, Cumbria"; // Your city
    const weatherText = document.getElementById('weatherText');
    const temperature = document.getElementById('temperature');
    const bottomText = document.getElementById('bottomText');

    function getWeather() {
        const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const condition = data.weather[0].main.toLowerCase();
                const temp = data.main.temp;

                let weatherMessage;
                if (condition.includes("cloud")) {
                    weatherMessage = "It's a bit cloudy out";
                    weatherText.classList.add('cloudy');
                } else if (condition.includes("rain")) {
                    weatherMessage = "It's wet out";
                    weatherText.classList.add('rainy');
                } else {
                    weatherMessage = "The weather is nice!";
                }

                weatherText.textContent = weatherMessage;
                temperature.textContent = `${temp}°C`;
                bottomText.textContent = "Might need your sunnies, umbrella or both!";
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                weatherText.textContent = 'Error loading weather data';
            });
    }

    getWeather();
});
