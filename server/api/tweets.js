"use strict";

const User    = require("../lib/user-helper")
const express = require('express');
const tweets  = express.Router();

module.exports = function(db) {

  tweets.get("/", function(req, res) {
    let tweets = db.getTweets((err, tweets) => {
      // adult self-respecting devs would error-check here.  Jeremy does not
      console.log("tweets", tweets);
      res.json(tweets);
    });
  });

  tweets.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400);
      var sendReturnVal = res.send("{'error': 'invalid request'}\n");
      // console.log("Jeremy suspects this is dumb: ", sendReturnVal);
      return sendReturnVal;
    }

    const user = req.body.user ? req.body.user : User.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };
    db.saveTweet(tweet);
    var sendReturnVal = res.send();
    // console.log("Jeremy suspects this is dumb: ", sendReturnVal);
    return sendReturnVal;
  });
  return tweets;
}
