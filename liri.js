const keys = require('./index.js');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require('request');
var fs = require('fs');


var getMyTweets = function() {
    var client = new Twitter(keys.twitterKeys);
    var params = {screen_name: 'heyemmibee'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
     if (!error) {
    // console.log(tweets);
      for (var i=0; i<tweets.legnth; i++) {
        console.log(tweets[i].created_at);
        console.log('  ');
        console.log(tweets[i].text);
        // console.log(tweets[i].screen_name);
        // console.log(tweets[i].location);
    }
  }
});
}

// Spotify has been updated to require access tokens, needed to switch to new spotify module.
//     spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
//     if ( err ) {
//         console.log('Error occurred: ' + err);
//         return;
//     }
//  console.log(data);
// });

var getMeSpotify = function (songName) {
    //keeping secret keys secret!
    var spotify = new Spotify(keys.spotifyKeys);
  spotify.search({ type: 'track', query: songName}, function(err, data) {
    if (err) {
      return console.log('Error: ' + err);
    }
//   console.log(data.tracks.items[0]);
    var songs = data.tracks.items;
    for (var i=0; i<songs.length; i++) {
        console.log(i);
        console.log("Track Name: " + songs[i].name);
        console.log("Album Name: " + songs[i].album.name);
        //artist is coming back undefined... something with [object Object],[object Object]
        // console.log("Artist(s): " + songs[i].artists.name);
        console.log("Release Date: " + songs[i].album.release_date);
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        
    }

  });
}
var getMyMovies = function (movieName) { 
  //sadly can't get this to work right now. something with the API key and how I'm transposing it i guess. 
  // var omdbapi = new request(keys.omdbKeys.id);
  // request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json" + omdbapi, 
  request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json&apikey=trilogy",
  function (error, response, body) {
  if (!error && response.statusCode) {
  // console.log('body:', body);

  var jsonData = JSON.parse(body);
  console.log('Title: ', jsonData.Title);
  console.log('Actors: ', jsonData.Actors);
  console.log('Year: ', jsonData.Year);
  console.log('Rated: ', jsonData.Rated);
  console.log('IMDB Rating: ', jsonData.imdbRating);
  console.log('Rotten Tomatoes: ', jsonData.tomatoURL);
  console.log('Language: ', jsonData.Language);
  console.log('Country: ', jsonData.Country);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
  }
});
}

var doWhatItSays = function () {
fs.readFile("random.txt", 'utf8', function (err, data) {
  if (err) throw err;
  
  var randomdata = data.split(',');

  if (randomdata.length == 2) {
    pick(randomdata[0], randomdata[1]);
  } else if (randomdata.length == 1) {
    pick(randomdata[0]);
  }
});
}
var pick = function(caseData, functionData) { 
    switch(caseData) {
        case 'my-tweets' :
            getMyTweets();
            break;
        case 'spotify-this-song' :
            getMeSpotify(functionData);
            break;
        case 'movie-this' :
            getMyMovies(functionData);
            break;
        case 'do-what-it-says' :
            doWhatItSays();
            break;
        default:
        console.log("Liri won't do that.");
    }
}
var runThis = function(arOne, argTwo) {
    pick(arOne, argTwo);
};

runThis(process.argv[2], process.argv[3])