// CREAZIONE SELECT
function createGenreList() {

 var target = $('#genre-selector');

 $.ajax ({
   url : 'https://api.themoviedb.org/3/genre/movie/list',
   method : 'GET',
   data : {
    'api_key': '8a9865f75eca2ef944ceabef50501298',
    'language': 'it-IT'
    },

   success: function(data) {
     var genres = data["genres"];

     for (var i = 0; i < genres.length; i++) {
       var genreID = genres[i].id;
       var genreName = genres[i].name;
       target.append('<option value="'+ genreID + '">' + genreName + '</option>');
        }
    },

   error: function(request, state, error) {
     console.log('request' , request);
     console.log('state' , state);
     console.log('error' , error);
    }
  });

}

//FUNZIONI CLICK
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
      var type = "movie";
      addActors(whatSearch, type);
      addGenres(whatSearch, type);
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
      var type = "tv";
      addActors(whatSearch, type);
      addGenres(whatSearch, type);
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
};
function addActors(whatSearch, type) {

  whatSearch.each(function() {
    var id =  $(this).data("id");
    var target =$(this).find('.cast-list');

    $.ajax ({
      url : 'https://api.themoviedb.org/3/' + type + '/'+ id +'/credits',
      method : 'GET',
      data : {
       'api_key': '8a9865f75eca2ef944ceabef50501298'
       },

      success: function(data) {
        var movieCast = data["cast"];

        if (movieCast != "") {
          for (var i = 0; i < 5 && i < movieCast.length; i++) {
             var actor = movieCast[i].name;
             target.append('<li>' + actor + '</li>');
           }
        }
        else {
          target.append('NON DISPONIBILE')
        }
       },

      error: function(request, state, error) {
        console.log('request' , request);
        console.log('state' , state);
        console.log('error' , error);
       }
     });
  });
};
function addGenres(whatSearch, type) {

    whatSearch.each(function() {
      var id =  $(this).data("id");
      var target =$(this).find('.genre-list');

      $.ajax ({
        url : 'https://api.themoviedb.org/3/' + type + '/'+ id,
        method : 'GET',
        data : {
         'api_key': '8a9865f75eca2ef944ceabef50501298',
         'language': 'it-IT'
         },

        success: function(data) {
          var genres = data["genres"];

          if (genres != "") {
            for (var i = 0; i < genres.length && i < 5; i++) {
               var genre = genres[i].name;
               var genreID = genres[i].id;
               target.append('<li data-genreID="' + genreID + '" >' + genre + '</li>');
             }
          }
          else {
            target.append('NON DISPONIBILE')
          }
         },

        error: function(request, state, error) {
          console.log('request' , request);
          console.log('state' , state);
          console.log('error' , error);
         }
       });
    });


}

// FUNZIONI SELECT GENRES
function addChangeSelectListener() {
  var selector = $("#genre-selector");
  selector.change(function() {
    var movie = $('.movie');
    var serie = $('.serie');
    selectGenre(selector, movie);
    selectGenre(selector, serie);
  });
};
function selectGenre(selector, type) {

  var selectedGenre = parseInt(selector.val());
  type.show();

  if (selectedGenre != 0 ) {
     type.each(function() {
     var genresArray = [];

     $(this).find(".genre-list li").each(function() {
       var genreID = $(this).data("genreid");
       genresArray.push(genreID);
      });

     var isGenreInArr = genresArray.includes(selectedGenre);
     if (!(isGenreInArr)) {
       $(this).hide();
     }
   });
 };
}

function init() {
createGenreList();
addClickButtonListener();
addChangeSelectListener();
}

$( document ).ready(init);
