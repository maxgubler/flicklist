

var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "531ad003325e5f5b8f57abb3e9cc5c67" // DONE put api key here
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
			api_key: api.token,
		},
		success: function(response) {
			console.log("We got a response from The Movie DB!");
			console.log(response);
			
			// DONE
			// update the model, setting its .browseItems property equal to the movies we recieved in the response
			model.browseItems = response.results;
			
			// invoke the callback function that was passed in. 
			callback();
		}
	});
  
}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {
  // DONE
  // clear everything from both lists
  $('#section-watchlist ul').empty();
  $('#section-browse ul').empty();
  
  // DONE 6
  // for each movie on the user's watchlist, insert a list item into the <ul> in the watchlist section
  model.watchlistItems.forEach(function(movie) {
		$('#section-watchlist ul').append('<li><p>' + movie.title + '</p></li>');	
  });
  
  
  // for each movie on the current browse list, 
  model.browseItems.forEach(function(movie) {
		// DONE
		// insert a list item into the <ul> in the browse section
		$('#section-browse ul').append('<li><p>' + movie.title + '</p></li>');
		
		// DONE
		// the list item should include a button that says "Add to Watchlist"
		var addToWatchlistBtn = $('<button></button>').text('Add to Watchlist');
		$('#section-browse ul').append(addToWatchlistBtn);
		
		// DONE
		// when the button is clicked, this movie should be added to the model's watchlist and render() should be called again
		addToWatchlistBtn.click(function(){
			model.watchlistItems.push(movie);
			render();	
		});
  });
  
}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});

