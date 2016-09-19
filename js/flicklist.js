

var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {

  root: "https://api.themoviedb.org/3",
  token: "531ad003325e5f5b8f57abb3e9cc5c67", // DONE: add your api key

  /**
   * Given a movie object, returns the url to its poster image
   */
  posterUrl: function(movie) {
    // DONE:
    // implement this function
    var imageRoot = "http://image.tmdb.org/t/p/";
    return imageRoot + "w300/" + movie.poster_path;
  }
}


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
  $.ajax({
    url: api.root + "/discover/movie",
    data: {
      api_key: api.token
    },
    success: function(response) {
      model.browseItems = response.results;
      callback(response);
    }
  });
}


/**
 * Makes an AJAX request to the /search endpoint of the API, using the 
 * query string that was passed in
 *
 * if successful, updates model.browseItems appropriately and then invokes
 * the callback function that was passed in
 */
function searchMovies(query, callback) {
  $.ajax({
    url: api.root + "/search/movie",
    data: {
      api_key: api.token,
      query: query
    },
    success: function(response) {
      model.browseItems = response.results;
      callback(response);
    }
  });
}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {

  // clear everything
  $("#section-watchlist ul").empty();
  $("#section-browse ul").empty();

  // insert watchlist items
  model.watchlistItems.forEach(function(movie) {
    var title = $("<h6></h6>").text(movie.original_title);

    // DONE:
    // add an "I watched it" button and append it below the title
    // Clicking should remove this movie from the watchlist and re-render
    var watchedBtn = $("<button></button>").text("I watched it")
    // DONE:
    // apply the classes "btn btn-danger" to the "I watched it button"
    .attr("class", "btn btn-danger")
    .click(function(){
      var index = model.watchlistItems.indexOf(movie);
      model.watchlistItems.splice(index, 1);
      render();
    });

    // DONE:
    // add a poster image and append it inside the 
    // panel body above the button
    var poster = $("<img></img>")
    .attr("src", api.posterUrl(movie))
    .attr("class", "img-responsive");
    
    var panelHeading = $("<div></div>").addClass("panel-heading")
    .append(title);
    
    var panelBody = $("<div></div>").addClass("panel-body")
    .append(poster)
    .append(watchedBtn);

    // DONE:
    // re-implement the li as a bootstrap panel with a heading and a body
    var itemView = $("<li></li>")
      .append(panelHeading)
      .append(panelBody)
      .attr("class", "panel panel-default");
      

    $("#section-watchlist ul").append(itemView);
  });

  // insert browse items
  model.browseItems.forEach(function(movie) {

    // DONE:
    // style this list item to look like the demo
    // You'll also need to make changes in index.html.
    // use the following BS classes:
    // "list-group", "list-group-item", btn", "btn-primary", 

    var title = $("<h4></h4>").text(movie.original_title);

    var button = $("<button></button>")
      .text("Add to Watchlist")
      .addClass("btn btn-primary")
      .click(function() {
        model.watchlistItems.push(movie);
        render();
      })
      .prop("disabled", model.watchlistItems.indexOf(movie) !== -1);

    var overview = $("<p></p>").text(movie.overview);

    // append everything to itemView, along with an <hr/>
    var itemView = $("<li></li>")
      .append(title)
      .append(overview)
      .append(button)
      .addClass("list-group-item");
      
    // append the itemView to the list
    $("#section-browse ul").append(itemView)
    .addClass("list-group");
  });
  
}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});