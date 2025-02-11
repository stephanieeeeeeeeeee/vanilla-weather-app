function handleSearchSubmit(event) {
	event.preventDefault();
	let searchInput = document.querySelector("#search-input");
	let currentCityElement = document.querySelector("#current-city");
	currentCityElement.innerHTML = searchInput.value;
	// call API
	// search for city
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
