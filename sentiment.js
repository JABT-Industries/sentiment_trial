// Extract sentiment from Twitter, based on a keyword search.

var assert = require('assert') // https://github.com/defunctzombie/commonjs-assert
var config = require('config') // https://github.com/lorenwest/node-config
var sentiment = require('sentiment') // https://github.com/thisandagain/sentiment

// get our requirements
twitter = require('./twitter_client.js')
if (config.get('store_results')){
  db = require('./mongo_client.js')
}

filter = function(err, data){
  assert.equal(err, null)

  // twitter data is verbose, make a smaller array with ratings
  var withRating = []
  data.statuses.forEach(function(doc){
    doc['rating'] = sentiment(doc['text']);
    withRating.push({
      "_id": doc['id'],
      "text": doc['text'],
      "score": doc['rating'].score,
      "positive": doc['rating'].positive, // words which it believes have a positive connotation
      "negative": doc['rating'].negative // words which it believes have a negative connotation
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

// confirm we got a keyword to search on. 
if (process.argv[2] != null) {
  twitter.search(process.argv[2], filter)
} else {
  console.log('please include a search term');
  process.exit
}
