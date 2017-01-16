var http = require("http");
var https = require("https");


//Print out message
function printMessage(username, badgeCount, points) {
  var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in JavaScript";
  console.log(message);
}

//Print out error messages
function printError(error) {
  console.error(error.message);
};

function get(username) {
  //Connect to the API URL (http://teamtreehouse.com/username.json)
  var request = https.get("https://teamtreehouse.com/" + username + ".json", function(response) {
    var body = "";
    //Read data from the response
    response.on('data', function(chunk) {
      body += chunk;
    });
    response.on('end', function() {
      if(response.statusCode === 200) {
        try {
          //Parse the data
          var profile = JSON.parse(body);
          //Print out the data
          printMessage(username, profile.badges.length, profile.points.JavaScript);
        } catch(error) {
          //Parse error
          printError(error);  
        }
      } else {
        //Status code error
        printError({message: "There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"});
      }
    });
  });
  
  //Connection error
  request.on('error', printError);
};

module.exports.get = get;