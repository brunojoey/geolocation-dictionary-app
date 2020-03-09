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
  var specialChars ="!#$%&'()*+,-./:;<=>?@[\]^_`{|}~0987654321"; // for audio link generation

  
  function sendQuery(url){
      $.ajax({
          url: url,
          method: "GET"
        }).then(function (response) {
  
          if (typeof response[0] === "string"){
              handleMispelled(response);
          }
          console.log(response);
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
  
    var audioURL = "https://media.merriam-webster.com/soundc11/" //used for audio required
      if(isFirstSearch){
          $("#tbody").html("");
          isFirstSearch = false;
      }
      var tr = $("<tr>");
      var td1 = $("<td>");
      var td2 = $("<td>");
  
      td1.text(searchTerm);

      //get audio link information
      var audioLink;
      var audioStart;
      var firstLetter;

      if(data[0].hwi.prs!== undefined){
          audioLink =  data[0].hwi.prs[0].sound.audio;
          audioStart = audioLink.slice(0,3);
          firstLetter = audioStart.slice(0,1);
      } 
      if(audioStart === "bix"){
          audioURL += "bix/";
      } else if(audioStart === "gg"){
          audioURL +="gg";
      } else if (specialChars.includes(firstLetter)){
        audioURL += "number/";
      } else {
          audioURL += firstLetter + "/";
      }
      audioURL += audioLink +".wav"

      
      var audioCtrls = $("<audio controls><source src="+audioURL+" />Your browser doesn't support audio</audio>");
      //line below used to enable autoplay
    //   audioCtrls.attr("autoplay", true); //
      audioCtrls.attr("hidden", true);
      audioCtrls.attr("id", searchTerm);


    // code below can be implemented to show each definition 

    //   for(var i = 0; i < data[0].shortdef.length; i++){
    //       var p = $("<p>");
    //       p.text(i+1 + ": " + data[0].shortdef[i])
    //         td2.append(p);
    //   }

      td2.text(data[0].shortdef[0]);
      tr.on("click", playSound);
      tr.append(td1);
      tr.append(td2);
      tr.append(audioCtrls);
      
  
      $("#tbody").prepend(tr);
  }

  function playSound(){ // play a sound when the row is clicked

    event.preventDefault();
    var audioEl = $(this)[0].lastElementChild;
    audioEl.play();
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
  
  
