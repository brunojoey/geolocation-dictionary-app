var baseURL = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/"
const apiKey = "?key=dea56771-7642-4f50-895c-bb6a6a34f4de"
var searchTerm = ""
var url = baseURL + "frozen" + apiKey

$.ajax({
    url: url,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    
})

const geoApiKey = 'at_hD6JpWnRqX4YG6LsBbHUWzg0rBYAs'
var geoURL = 'https://geo.ipify.org/api/v1?apiKey=' + geoApiKey
var state;
var city;
var lat;
var lng;

$.ajax({
    url: geoURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
    state = response.location.region;
    city = response.location.city;
    lat = response.location.lat;
    lng = response.location.lng;
})

