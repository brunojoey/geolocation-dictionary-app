var Owlbot = require('owlbot-js');
var client = Owlbot("5e44986a36e9cafddb7b577dad4bf365b0368b87");
client.define('owl').then(function(result){
   console.log(result);
});

function getWord(){
    $.ajax({
        url: 'https://owlbot.info/api/v4/dictionary/owl?format=json' , 

        headers: { "Access-Control-Allow-Origin": "*", 
                    'Access-Control-Allow-Credentials' : 'true', 
                    "Authorization": "Token" + "5e44986a36e9cafddb7b577dad4bf365b0368b87"  
                    }, //Authentication using a token to access API

        type: "GET",


        data: { //parameters 
        },

    })

        .done(function (data) {
            // Show formatted JSON on webpage.
            console.log(JSON.stringify(data));

        })

}
getWord();