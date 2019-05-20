const keys = require('./index.js');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');

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
      return console.log('Error occurred: ' + err);
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

var pick = function(caseData, functionData) { 
    switch(caseData) {
        case 'my-tweets' :
            getMyTweets();
        break;
        case 'spotify-this-song' :
            getMeSpotify(functionData);
            default:
                console.log("Liri won't do that.");
    }
}
var runThis = function(arOne, argTwo) {
    pick(arOne, argTwo);
};

runThis(process.argv[2], process.argv[3])