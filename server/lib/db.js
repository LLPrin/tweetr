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
