var config = require('config') // https://github.com/lorenwest/node-config
var twitter = require('twitter') // https://github.com/desmondmorris/node-twitter

var twitterConfig = config.get('twitter')
var twitClient = new twitter(twitterConfig)

var exports = module.exports = {}

exports.search = function(keyword, callback){
  twitClient.get('search/tweets', {q: keyword}, function(error, tweets, response){
    if (!error) {
      callback(null, tweets)
    } else {
      err = 'could not connect to twitter : ' + error
      callback(err,null)
    }
  })
}
