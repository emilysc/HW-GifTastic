// Instructions
// 1. create an array of strings, each one related to a topic that interests you. 
// >   Save it to a variable called topics.
// 2. Your app should take the topics in this array and create buttons in your HTML.
//     Try using a loop that appends a button for each string in the array.
// 3. When the user clicks on a button, the page should grab 10 static, non-animated gif images 
//     from the GIPHY API and place them on the page.
// 4. When the user clicks one of the still GIPHY images, the gif should animate. 
//     If the user clicks the gif again, it should stop playing.
// 5. Under every gif, display its rating (PG, G, so on).
//     This data is provided by the GIPHY API.
//     Only once you get images displaying with button presses should you move on to the next step.
// 6. Add a form to your page takes the value from a user input box and adds it into your topics array. 
//     Then make a function call that takes each topic in the array remakes the buttons on the page. -->
// Giphy Public Key:"dc6zaTOxFJmzC" https://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC
        
      
// Create an array of gifs
var gifs = ["happy", "sad", "surpise", "satisfied"];

// displayGifInfo function re-renders the HTML to display the appropriate content
function displayGifInfo() {

  var gif = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10";

  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET", 
    datatype: 'json'
  }).then(function(response) {
    console.log(response);
    var results = response.data;
    
    // Creating a div to hold the gif
    var gifDiv = $("<div class='gif-div'>");
    $('#gif-view').empty().append(gifDiv);

    for (var i = 0; i < 10; i++) {
    var imageContainer = $("<div class='image'>");
  // -------------------------------------------------------
    // Storing the rating data
    var rating = results[i].rating;

    // Creating an element to have the rating displayed
    var pOne = $("<p>").text("Rating: " + rating);
    
    // Displaying the rating
    imageContainer.prepend(pOne);
  // ---------------------------------------------------------
    // Retrieving the URL for the image
    var animateImageURL = results[i].images.original.url;
    var stillImageURL = results[i].images.original_still.url;
    
    // Creating an element to hold the image
    var image = $("<img>").attr({
      "src": stillImageURL, 
      "data-still": stillImageURL,
      "data-animate": animateImageURL,
      "data-state": "still",
      "class": "gif",
      });

    // Appending the image
    imageContainer.prepend(image);
    gifDiv.append(imageContainer);
    }
  });

}

// Function for displaying gif data
function renderButtons() {

  // Deleting the gif prior to adding new gifs
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();
  // * clear the div with all the images
  $("#gif-view").empty();

  // Looping through the array of gifs
  for (var i = 0; i < gifs.length; i++) {

    // Then dynamicaly generating buttons for each gif in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of gif-btn to our button
    a.addClass("gif-btn");
    // Adding a data-attribute
    a.attr("data-name", gifs[i]);
    // Providing the initial button text
    a.text(gifs[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a gif button is clicked
$("#add-gif").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var gif = $("#gif-input").val().trim();

  // Adding gif from the textbox to our array
  gifs.push(gif);

  // Calling renderButtons which handles the processing of our gif array
  renderButtons();
});

//action for the giphs active and still states

function clickedGif(){
// The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var gifState = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (gifState === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
        }
  }

// Adding a click event listener to all elements with a class of "gif-btn"
$(document).on("click", ".gif-btn", displayGifInfo);
$(document).on("click", ".gif", clickedGif);

// Calling the renderButtons function to display the intial buttons
renderButtons();