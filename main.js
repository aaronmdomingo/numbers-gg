$(document).ready(init); // This line is defining a function that will run once the HTML document loads.
$('#startBtn').click(initializeApp);

var randomArray = [];
var randomNumber1 = $('#randomNumber1');
var randomNumber2 = $('#randomNumber2');
var randomNumber3 = $('#randomNumber3');
var randomNumber4 = $('#randomNumber4');

var guessArray = [];
var guessNumber1 = $('#guessBox-1')
var guessNumber2 = $('#guessBox-2')
var guessNumber3 = $('#guessBox-3')
var guessNumber4 = $('#guessBox-4')

var statusResult = $('#statusResult');
var guessDisplayBox = $('.guess__Display-box')

function init() {
  guessNumber1.val('');
  guessNumber2.val('');
  guessNumber3.val('');
  guessNumber4.val('');

  randomNumber1.text('0');
  randomNumber2.text('0');
  randomNumber3.text('0');
  randomNumber4.text('0');

  statusResult.text('status')
  randomArray = [];
  guessArray = [];
  guessDisplayBox.removeClass('indicatorBorder')
}

function initializeApp () {
  var checkBtn = $('#checkBtn');
  var resetBtn = $('#resetBtn');
  randomArray = pick_number();
  randomNumber1.text('?');
  randomNumber2.text('?');
  randomNumber3.text('?');
  randomNumber4.text('?');

//Create a timer






//CHECK GAME
  checkBtn.click(make_guess);
  resetBtn.click(init)
}



function pick_number() {
  var randomNumber = null;
  for (var i = 0 ; i < 4 ; i++) {
    random_number = Math.floor(Math.random() * 10);
    randomArray.push(random_number);
  }
  return randomArray;
}

function make_guess() {
  var val1 = parseInt($('#guessBox-1').val());
  var val2 = parseInt($('#guessBox-2').val());
  var val3 = parseInt($('#guessBox-3').val());
  var val4 = parseInt($('#guessBox-4').val());
  var guessString;
  var randomString;
  guessArray = [val1, val2, val3, val4];

  console.log('random array:' , randomArray);
  console.log('guess array: ', guessArray);

  for (var i = 0 ; i < randomArray.length; i++) {
    for (var j = 0; j < guessArray.length; j++) {
      if (guessArray[j] === randomArray[j]) {
        $(`#guessBox-${j + 1}`).addClass('indicatorBorder');
        $(`#randomNumber${j+1}`).text(guessArray[j]);
      } else if (guessArray[j] > randomArray[j]) {
        $(`.arrowDown-${j + 1}`).addClass('indicatorColor');
        setTimeout(function() {
          $('.arrow').removeClass('indicatorColor');
        }, 1000)
      } else if (guessArray[j] < randomArray[j]) {
        $(`.arrowUp-${j + 1}`).addClass('indicatorColor');;
        setTimeout(function () {
          $('.arrow').removeClass('indicatorColor');
        }, 1000)
      }
    }
    guessString = guessArray.join('');
    randomString = randomArray.join('');
    if (guessString === randomString) {
      statusResult.text('YOU WON!');
      //DO CODE WHEN WON
    }
  }

}

// function clearInput() {
//   guessNumber1.val('');
//   guessNumber2.val('');
//   guessNumber3.val('');
//   guessNumber4.val('');

//   // randomNumber1.text('0');
//   // randomNumber2.text('0');
//   // randomNumber3.text('0');
//   // randomNumber4.text('0');
// }
