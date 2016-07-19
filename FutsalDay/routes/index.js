var express = require('express');
var async = require('async');
var router = express.Router();


var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/futsalday';

/* GET home page. */
router.get('/', function(req, res, next) {

  var results;

  MongoClient.connect(url, function(err, db){
    if(err){
      console.log("[DBserver] : Unable to connect to the mongodb Server. Error: ",err);
    }else{
      console.log("[DBserver] : Connection established to" , url);
      var collection = db.collection('notice');

      collection.find({}).toArray(function(err, docs){
				db.close();
				async.each(docs, function(doc, cb){

					delete doc._id;
					return cb(null);

				}, function(err){
					if(err){
						console.log("async.each Error");
					}else{

					}
				});
        //db에서 꺼내온 데이터 출력
        var results = docs;
        console.log(results);
        res.render('index', { results });
			});

    }
  });


});

module.exports = router;
