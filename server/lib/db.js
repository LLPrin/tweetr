"use strict";

const initialTweets = require("mongodb")
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1:27017/tweeter";

console.log(`Connecting to MongoDB running at: ${MONGODB_URI}`);


module.exports = {

  connect: (onConnect) => {
    MongoClient.connect(MONGODB_URI, (err, db) => {

      if (err) {
        console.log('Could not connect! Unexpected error. Details below.');
        throw err;
      }


      const dbMethods = {

        saveTweet: (data) => {
          db.collection('tweets').insertOne(data);
          // return true;
          // Really good devs would have a callback here to handle errors (and handle success by doing nothing)
        },

        getTweets: (callback) => {
          // db.collection('tweets').find().toArray((err, arg)=>{
          //   console.log("I am a toArray callback, and here's my arg: ", arg)
          // })
          db.collection('tweets').find().toArray(callback);
          // return db.tweets.sort(function(a, b) { return a.created_at - b.created_at });  // good idea, but not strictly necessary
        }

      };

      onConnect(dbMethods);

    });
  }

}


// module.exports = {

//   connect: (onConnect) => {

//     onConnect(dbMethods);

//   }


// }



    // console.log('Connected to the database!');
    // var tweets = db.collection('tweets');

    // console.log('Retrieving documents for the "tweets" collection...');
    // collection.find().toArray((err, results) => {
    //   console.log('tweets: ', results);

    //   // console.log('results: ', results);

    //   // console.log('Disconnecting from Mongo!');
    //   // db.close();
    //     const closeConnection = function () {
    //   console.log("Closing db connection.");
    //   try {
    //     db.close();
    //   }
    //   catch (e) {
    //     console.error("Error while shutting down:", e.stack);
    //   }
    //   console.log("Bye!");
    //   process.exit();
    // };

    // // Signal handlers make sure to call closeConnection before
    // // exiting
    // //
    // // INT signal, e.g. Ctrl-C
    // process.on('SIGINT', closeConnection);
    // // TERM signal, e.g. kill
    // process.on('SIGTERM', closeConnection);

    // });
    // console.log(tweets);
    // db = tweets;