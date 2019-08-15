$(document).ready(initializeApp); // This line is defining a function that will run once the HTML document loads.

function initializeApp () {
//this is where you need to place the function call for your random number generator function.
//You will also place your clickhandler in here
the_number = pick_number();
var button = $('.btn__guess');
button.click(make_guess);
}

var the_number = null;

function pick_number() {
  var random_number = (Math.floor(Math.random()*10))+1;
  return random_number;
}

function make_guess() {
  var the_guess = parseInt($('#guess_input').val());
  var the_response = $('#response_div');


  if (the_guess > the_number) {
    the_response.text('Too High!');
  } else if (the_guess < the_number) {
    the_response.text('Too Low!');
  } else if (the_guess ===  the_number) {
    the_response.text('You guessed it! :)');
  }
}
