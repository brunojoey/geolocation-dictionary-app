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
