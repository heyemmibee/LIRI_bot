const keys = require('./index.js');
const Twitter = require('twitter');

const getMyTweets = function() {

    const client = new Twitter(keys.twitterKeys);

    const params = {screen_name: 'heyemmibee'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
     if (!error) {
    // console.log(tweets);
      for (var i=0; i<tweets.legnth; i++) {
        console.log(tweets[i].created_at);
        console.log('  ');
        console.log(tweets[i].text);
        console.log(tweets[i].screen_name);
        console.log(tweets[i].location);
    }
  }
});
}
const pick = function(caseDarta, functionData) {
    switch(caseData) {
        case 'my-tweets' :
            getMyTweets();
    }
}