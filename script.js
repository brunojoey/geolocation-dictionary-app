
var baseURL = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/"
const apiKey = "?key=dea56771-7642-4f50-895c-bb6a6a34f4de"
var searchTerm = ""
var url = baseURL + "default" + apiKey



function sendQuery(url){
    $.ajax({
        url: url,
        method: "GET"
      }).then(function (response) {
        console.log(response);
        displayResponse(response);
    
    })
}

function displayResponse(data){


}

$("#search").on("click", function(){
    event.preventDefault();
    console.log("it works");
    searchTerm = $("#input").val();
    url = baseURL+searchTerm+apiKey;
    sendQuery(url);
})