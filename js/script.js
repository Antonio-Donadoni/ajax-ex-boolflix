
function addClickButtonListener() {
  var target = $("#search-btn");
  target.click(getMovie);
}


function getMovie() {

 var query = $("#search-bar").val();
 console.log(query);

  $.ajax ({
   url : 'https://api.themoviedb.org/3/search/movie?api_key=e99307154c6dfb0b4750f6603256716d&query=ritorno',
   method : 'GET',
  //  data : {
  // 'api_key': '8a9865f75eca2ef944ceabef50501298',
  // 'query': 'matrix'
  //      },
   success : function(data, state) {

     var success = data['success'];
     var movies = data['response'];

     if (success) {

       console.log(movies);
        // for (var i = 0; i < arr.length; i++) {
        //
        //   var album = arr[i];
        //
        //   var template = $('#album-template').html();
        //   var compiled = Handlebars.compile(template);
        //   var target = $('.cds-container');
        //   var albumHTML = compiled(album);
        //
        //   target.append(albumHTML);
        // }

         }

     else {
       console.log("error");
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
