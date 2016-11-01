/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

$(function() {
  console.log('im ready');
  function renderTweets(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    var rawTweetData = '';
    for (let user of tweets ) {
      rawTweetData = createTweetElement(user) + rawTweetData;
    }
    //for form vaildation change from append to prepend
    return  $('#oldTweets').prepend(rawTweetData);

  }

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function createTweetElement(tweet) {

    return `
      <article class="tweet">
        <header>
          <img class="logo" src="${tweet.user.avatars.small}">
          <span class="username">${tweet.user.name}</span>
          <span class="handle">${tweet.user.handle}</span>
        </header>
        <p class="tweettext">${escape(tweet.content.text)}</p>
        <footer class="timestamp">
          ${tweet.created_at}
          <span class="glyphicon glyphicon-heart-empty"></span>
          <span class="glyphicon glyphicon-refresh"></span>
          <span class="glyphicon glyphicon-flag"></span>
        </footer>
      </article>
      `;
  }


  //---------------------AJAX SUBMIT TWEET

  $(':input:submit').on('click', function(event) {
    event.preventDefault();
    let data = $("[name='text']").serialize();
    if (data.length > 140) {
      alert('Your tweet must be below 140 characters.')
    } else {
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $( "[name='text']" ).serialize(),
      }).then(function successCb(data) {
        console.log("post was successful");
        loadTweets();
      }, function errorCb(err) {
        alert('Cannot post empty text.')
        console.error(err);
      });
    }
  });

  function loadTweets(){
    $.ajax({
      //handling JSON response instead.
      url: '/tweets',
      method: 'GET'
    }).then(function successCb(data) {
      console.log('data from server resp', data);
      renderTweets(data);
    }, function errorCb(err) {
      console.error(err);
    });
  }

   loadTweets();

//-------------Button Slide
  $('#compose').on('click', function() {
    event.preventDefault();
    if(!$(this).hasClass('.active')) {
      $('#compose').find('.active').removeClass('.active');
      $(this).addClass('.active');
      $('.new-tweet').slideUp();
      console.log("slides here")
      $('.new-tweet[id=' + $(this).attr('data-id') + ']').slideDown();

    } else {
      $('.new-tweet').slideDown();
      $('textarea').focus();
      $('#compose').removeClass('.active');
      }
  })

});
