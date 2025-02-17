function updateWeather(response) {
	let temperatureElement = document.querySelector("#temperature");
	let temperature = response.data.temperature.current;
	let cityElement = document.querySelector("#city");
	let descriptionElement = document.querySelector("#description");
	let humidityElement = document.querySelector("#humidity");
	let windSpeedElement = document.querySelector("#wind-speed");
	let timeElement = document.querySelector("#time");
	let date = new Date(response.data.time * 1000);
	let iconElement = document.querySelector("#icon");

	cityElement.innerHTML = response.data.city;
	temperatureElement.innerHTML = Math.round(temperature);
	timeElement.innerHTML = formatDate(date);
	descriptionElement.innerHTML = response.data.condition.description;
	humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
	windSpeedElement.innerHTML = `${response.data.wind.speed}mp/h`;
	iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon" />`;

	getForecast(response.data.city);
}

function formatDate(date) {
	let minutes = date.getMinutes();
	let hours = date.getHours();
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let day = days[date.getDay()];

	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
	let apiKey = "e691ce40ft32d16eb370fo057db0ea64";
	let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
	axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
	event.preventDefault();
	let searchInput = document.querySelector("#search-input");

	searchCity(searchInput.value);
}

function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	return days[date.getDay()];
}

function getForecast(city) {
	let apiKey = "e691ce40ft32d16eb370fo057db0ea64";
	let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
	axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
	let forecastHtml = "";

	response.data.daily.forEach(function (day, index) {
		forecastHtml =
			forecastHtml +
			`
			<div class="day">
				<div class="date">${formatDay(day.time)}</div>
				<img src="${day.condition.icon_url}" class="icon"/>
				<div class="forecast-temperatures">
					<div class="forecast-temperature-max">
						<strong>${Math.round(day.temperature.maximum)}º</strong>
					</div>
					<div class="forecast-temperature-min">${Math.round(
						day.temperature.minimum
					)}º</div>
				</div>
			</div>
		`;
	});

	let forecastElement = document.querySelector("#forecast");
	forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("New York");
