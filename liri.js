const axios = require("axios");
require("dotenv").config();
const keys = require("./keys.js");
var moment = require('moment');
const Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs = require("fs");

function spotifygrabber() {
    spotify.search({
        type: 'track',
        query: process.argv[3]
    },
        function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log(data.tracks.items[0].album.artists[0].name);
            console.log(process.argv[3]);
            console.log(data.tracks.items[0].album.external_urls.spotify);
            console.log(data.tracks.items[0].album.name)
        });
};

function movie() {
    var title = "";
    for (var i = 3; i < process.argv.length; i++) {
        title += process.argv[i] + "+"
    }
    axios.get("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            if (title) {
                console.log("Title: " + response.data.Title);
                console.log("Release: " + response.data.Released);
                console.log("IMDB Rating: " + response.data.imdbrating);
            }
            else {
                console.log("\nIf you haven't watched Mr. Nobody,then you should: http://www.imdb.com/title/tt0485947/")
            }
        }
    );
};
function bands() {
    var artist = "";
    for (var i = 3; i < process.argv.length; i++) {
        artist += process.argv[i]
    }
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp&date=upcoming").then(
        function (response) {
            console.log("The venue is: " + response.data[0].venue.name);
            console.log("The date & time is: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
            console.log("The location is: " + response.data[0].venue.city);
        }
    )
};
function doWhat() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }
        console.log(data);
    })
};
if (process.argv[2] === "movie-this") {
    movie()
}
else if (process.argv[2] === "concert-this") {
    bands()
}
else if (process.argv[2] === "spotify-this-song") {
    spotifygrabber()
}
else if (process.argv[2] === "do-what-it-says") {
    doWhat()
};
