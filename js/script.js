
function addClickButtonListener() {
  var target = $("#search-btn");
  target.click(getMovie);
}


function getMovie() {
 $('#movies-list').html(" ");
 var query = $("#search-bar").val();

  $.ajax ({
   url : 'https://api.themoviedb.org/3/search/movie',
   method : 'GET',
   data : {
    'api_key': '8a9865f75eca2ef944ceabef50501298',
    'query': query,
    'language': "it-IT"
   },

   success: function(data) {
     var moviesArray = data["results"]

     for (var i = 0; i < moviesArray.length; i++) {

        var movie = moviesArray[i];
        var template = $('#movie-template').html();
        var compiled = Handlebars.compile(template);
        var target = $('#movies-list');
        var movieHTML = compiled(movie);
        target.append(movieHTML);
      }
      addStars();
      addFlags();
    },

   error: function(request, state, error) {
     console.log('request' , request);
     console.log('state' , state);
     console.log('error' , error);
    }
 });
};

function addStars() {

  $(".movie").each(function() {

    var vote = $(this).data("vote")
    var template = $('#stars-template').html();
    var compiled = Handlebars.compile(template);
    var target = $(this).find('#rating');


    if (vote > 0 && vote <= 2) {
      var movieHTML = compiled({
        'first-star' : 'fas fa-star',
        'second-star' : 'far fa-star',
        'third-star' : 'far fa-star',
        'fourth-star' : 'far fa-star',
        'fifth-star' : 'far fa-star'
      });
      target.append(movieHTML);
    }
    if (vote > 2 && vote <= 4) {
      var movieHTML = compiled({
        'first-star' : 'fas fa-star',
        'second-star' : 'fas fa-star',
        'third-star' : 'far fa-star',
        'fourth-star' : 'far fa-star',
        'fifth-star' : 'far fa-star'
      });
      target.append(movieHTML);
    }
    if (vote > 4 && vote <= 6) {
      var movieHTML = compiled({
        'first-star' : 'fas fa-star',
        'second-star' : 'fas fa-star',
        'third-star' : 'fas fa-star',
        'fourth-star' : 'far fa-star',
        'fifth-star' : 'far fa-star'
      });
      target.append(movieHTML);
    }
    if (vote > 6 && vote <= 8) {
      var movieHTML = compiled({
        'first-star' : 'fas fa-star',
        'second-star' : 'fas fa-star',
        'third-star' : 'fas fa-star',
        'fourth-star' : 'fas fa-star',
        'fifth-star' : 'far fa-star'
      });
      target.append(movieHTML);
    }

    if (vote > 8) {
      var movieHTML = compiled({
        'first-star' : 'fas fa-star',
        'second-star' : 'fas fa-star',
        'third-star' : 'fas fa-star',
        'fourth-star' : 'fas fa-star',
        'fifth-star' : 'fas fa-star'
      });
      target.append(movieHTML);
    }

  });

}

function addFlags() {


  $(".movie").each(function() {

    var language = $(this).data("language");
    console.log(language);
    var target = $(this).find('#flag');

    if (language == "en") {
      target.attr("src","img/uk_flag.png");
    }
    else if(language == "it") {

      target.attr("src","img/italy_flag.png");
    }
    else if (language == "ja") {

    target.attr("src","img/japan_flag.png");
    }
    else if (language == "ko") {

    target.attr("src","img/korea_flag.png");
    }
    else {
      target.attr("src","img/earth_flag.jpg");
      $(this).append("Unknown language")
    }

  });
}

function init() {

addClickButtonListener();

}

$( document ).ready(init);
