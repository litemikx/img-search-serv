var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var dbUrl = "mongodb://localhost:27017/mydb"; //process.env.PROD_MONGODB;
var baseHost = "https://img-search-serv.herokuapp.com";

//query for the top 10 recent terms searched
module.exports = function(callback) {

  MongoClient.connect(dbUrl, function(err, db) {
    if(err) throw err;
    var mySort = {when:-1};
    db.collection("recents").find().sort(mySort).limit(10).toArray(function(err, result) {
        if (err) throw err;
        //console.log(typeof result);
        db.close();
        return callback(null, result);
      });
  });
}
