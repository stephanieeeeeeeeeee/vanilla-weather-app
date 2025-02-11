function updateWeather(response) {
	let currentTemperatureElement = document.querySelector(
		"#current-temperature"
	);
	let currentTemperature = response.data.temperature.current;
	let currentCityElement = document.querySelector("#current-city");

	currentCityElement.innerHTML = response.data.city;
	currentTemperatureElement.innerHTML = Math.round(currentTemperature);
}

function searchCity(city) {
	// separate of concern
	let apiKey = `e691ce40ft32d16eb370fo057db0ea64`;
	let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
	axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
	event.preventDefault();
	let searchInput = document.querySelector("#search-input");

	searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("New York");
