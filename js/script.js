
function addClickButtonListener() {
  var target = $("#search-btn");
  target.click(function() {

  getMovie();
  getSerie();

  $("#search-bar").val(" ");
 });

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
     var moviesArray = data["results"];

     for (var i = 0; i < moviesArray.length; i++) {

        var movie = moviesArray[i];
        var template = $('#movie-template').html();
        var compiled = Handlebars.compile(template);
        var target = $('#movies-list');
        var movieHTML = compiled(movie);
        target.append(movieHTML);
      }

      var whatSearch= $('.movie');
      addStars(whatSearch);
      addFlags(whatSearch);
    },

   error: function(request, state, error) {
     console.log('request' , request);
     console.log('state' , state);
     console.log('error' , error);
    }
 });
};
function getSerie() {
  $('#series-list').html(" ");
  var query = $("#search-bar").val();

   $.ajax ({
    url : 'https://api.themoviedb.org/3/search/tv',
    method : 'GET',
    data : {
     'api_key': '8a9865f75eca2ef944ceabef50501298',
     'query': query,
     'language': "it-IT"
    },

    success: function(data) {
      var seriesArray = data["results"]

      for (var i = 0; i < seriesArray.length; i++) {

         var serie = seriesArray[i];
         var template = $('#series-template').html();
         var compiled = Handlebars.compile(template);
         var target = $('#series-list');
         var serieHTML = compiled(serie);
         target.append(serieHTML);
       }

       var whatSearch = $('.serie');
       addStars(whatSearch);
       addFlags(whatSearch);
     },

    error: function(request, state, error) {
      console.log('request' , request);
      console.log('state' , state);
      console.log('error' , error);
     }
  });
}


function addStars(whatSearch) {
  whatSearch.each(function() {
    var vote = $(this).data("vote");
    var target = $(this).find('.rating');

    var stars = Math.ceil(vote / 2);
    for (var j = 0; j < 5 ; j++) {
      if( j < stars) {
        target.append("<i class='fas fa-star'></i>")
      } else {
        target.append("<i class='far fa-star'></i>")
      }
    }
  });
};

function addFlags(whatSearch) {

  whatSearch.each(function() {

    var language = $(this).data("language");
    var target = $(this).find('.flag');

    switch (language) {
      case "en":
        target.attr("src","img/uk_flag.png");
        break;
      case "it":
        target.attr("src","img/italy_flag.png");
        break;
      case "ja":
        target.attr("src","img/japan_flag.png");
        break;
      case "ko":
        target.attr("src","img/korea_flag.png");
        break;

      default:
      target.attr("src","img/earth_flag_red.png");
    }
  });
}



function init() {
addClickButtonListener();
}
$( document ).ready(init);
