var locationData = {
    state: 'state',
    city: 'city',
    postalCode: 'postalCode',
    word: []
  };
  
  var baseURL = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/";
  const apiKey = "?key=dea56771-7642-4f50-895c-bb6a6a34f4de";
  var searchTerm = ""
  var isFirstSearch = true;
  var url = baseURL + "default" + apiKey
  var buttonHolder = $("<div>")
  
  function sendQuery(url){
      $.ajax({
          url: url,
          method: "GET"
        }).then(function (response) {
  
          if (typeof response[0] === "string"){
              handleMispelled(response);
          }
          displayResponse(response);
      })
  }
  
  function handleMispelled(data){
  
      buttonHolder.html("")
      var div = $("<div>").attr({class: "modal",id: "mod"});
      div.text("We did not recognize that word.  Did you mean any of these?")
      
      for(i=0; i<5; i++){
          var p = $("<p>").text(data[i]);
          div.append(p);
      }
  
      div.append($("<a>").attr({rel: "modal:close"}))
  
      var abtn = $("<a>").text("Show suggestions").attr({href: "#mod", rel: "modal:open"})
  
      abtn.attr("href", "#mod");
      buttonHolder.append(abtn);
      $(".container").append(div);
      $(".container").append(buttonHolder);
      abtn.trigger("click");
  }
  
  
  function displayResponse(data){
  
      if(isFirstSearch){
          $("#tbody").html("");
          isFirstSearch = false;
      }
      var tr = $("<tr>");
      var td1 = $("<td>");
      var td2 = $("<td>");
  
      td1.text(searchTerm)
      td2.text(data[0].shortdef[0]);
  
      tr.append(td1);
      tr.append(td2);
  
      $("#tbody").prepend(tr);
  }
  
  $("#search").on("click", function(){
      event.preventDefault();
      searchTerm = $("#input").val().toLowerCase();
      url = encodeURI(baseURL + searchTerm + apiKey);
      sendQuery(url);
      locationData.word.push(searchTerm);
      localStorage.setItem('location', JSON.stringify(locationData));
  })
  
  // Get location data
  const geoApiKey = 'at_hD6JpWnRqX4YG6LsBbHUWzg0rBYAs'
  var geoURL = 'https://geo.ipify.org/api/v1?apiKey=' + geoApiKey
  
  $.ajax({
      url: geoURL,
      method: "GET"
  }).then(function (response) {
      console.log(response);
      locationData.state = response.location.region;
      locationData.city = response.location.city;
      locationData.postalCode = response.location.postalCode;
      var h6El = $('#location');
      h6El.text(locationData.city + ' ' + locationData.state);
      $('#location').append(h6El);
  })
  
  