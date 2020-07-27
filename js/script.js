
function addClickButtonListener() {
  var target = $("#search-btn");
  target.click(getMovie);
}


function getMovie() {

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
    },

   error: function(request, state, error) {
     console.log('request' , request);
     console.log('state' , state);
     console.log('error' , error);
    }
 });
};


function init() {

addClickButtonListener();

}

$( document ).ready(init);
