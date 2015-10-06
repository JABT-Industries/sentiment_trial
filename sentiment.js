// Extract sentiment from Twitter, based on a keyword search.
var assert = require('assert')

var config = require('config') // https://github.com/lorenwest/node-config
var sentiment = require('sentiment') // https://github.com/thisandagain/sentiment

// in house requires
twitter = require('./twitter_client.js')
if (config.get('store_results')){
  db = require('./mongo_client.js')
}

filter = function(err, data){
  assert.equal(err, null)

  //console.log(data)
  var withRating = []
  data.statuses.forEach(function(doc){
    doc['rating'] = sentiment(doc['text']);
    withRating.push({
      "_id": doc['id'],
      "text": doc['text'],
      "score": doc['rating'].score,
      "positive": doc['rating'].positive,
      "negative": doc['rating'].negative
    })
  })
  if (config.get('display_results')){
    console.log(withRating)
  }

  if (config.get('store_results')){
    if (process.argv[4] == null){
      console.log('when store_results is true, please specify a db and collection')
      console.log('node sentiment.js searchTerm database collection')
      process.quit
    } else {
      db.save(withRating, process.argv[3], process.argv[4])
    }
  }
} // end filter method.

// confirm we got params.
if (process.argv[2] != null) {
  twitter.search(process.argv[2], filter)
} else {
  console.log('please include a search term');
  process.exit
}
