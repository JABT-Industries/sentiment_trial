var config = require('config') // https://github.com/lorenwest/node-config
var MongoClient = require('mongodb').MongoClient // https://github.com/mongodb/node-mongodb-native
var assert = require('assert') // https://github.com/defunctzombie/commonjs-assert

var mongoConfig = config.get('mongo')

var exports = module.exports = {}

exports.save = function(data, dbName, collectionName){
  var mongoUrl = 'mongodb://'+mongoConfig.host+':'+mongoConfig.port+'/'+dbName;
  MongoClient.connect(mongoUrl, function(err, db) {
    assert.equal(null, err)
    var collection = db.collection(collectionName)
    collection.insert(data, function(err, result) {
      assert.equal(err, null)
      console.log('inserted results into '+mongoUrl+' collection: '+collectionName)
      db.close()
      process.exit
    }) // end insert
  }) // end connect
  // no callback, end of the line.
}
