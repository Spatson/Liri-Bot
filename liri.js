require("dotenv").config();
const fs = require("fs");
const request = require("request");
const Twitter = require("twitter");
const Spotify = require("node-spotify-api");
const myKeys = require("./assets/keys.js");
const spotify = new Spotify(myKeys.spotify);
const client = new Twitter(myKeys.twitter);

switch (process.argv[2]) {
  case "my-tweets":
    tweetsFunction();
    break;

  case "spotify-this-song":
    spotifyFunction();
    break;

  case "movie-this":
    movieFunction();
    break;

  case "do-what-it-says":
    logTxtFunction();
    break;
}

function tweetsFunction() {
  console.log("Tweet Test");
  var params = { screen_name: "LiriUtbc" };
  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      console.log(tweets);
    } else {
      console.log("Something went wrong :(");
      console.log(error);
    }
  });
}

function spotifyFunction() {
  spotify
    .request("https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx")
    .then(function(data) {
      console.log(data);
    })
    .catch(function(err) {
      console.error("Error occurred: " + err);
    });
}

function movieFunction() {
  let movieName = "";
  let queryUrl = "";
  if (process.argv[3] === undefined) {
    movieName = "Friday Night Lights";
  }
  movieName = process.argv[3];
  queryUrl =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
  console.log(queryUrl);
  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(response.body);
    } else {
      console.log("Something went wrong :( " + error);
    }
  });
}

function logTxtFunction() {
  fs.readFile("./assets/random.txt", "utf8", function(error, data) {
    if (!error) {
      console.log("Raw " + data);
      let dataArray = data.split(",");
      console.log(dataArray[0]);
      console.log("Formatted " + dataArray);
    } else {
      console.log("Something went wrong :( " + error);
    };
  });
};