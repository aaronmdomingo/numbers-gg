$(document).ready(init); // This line is defining a function that will run once the HTML document loads.
$('#startBtn').click(initializeApp);

var randomArray = [];
var randomNumberAll = $('.randomNumber');
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
var guessDisplayBox = $('.guess__Display-box');
var countDownTime = $('#timerCount');
var timeCount;

var startBtn = $('#startBtn');
var checkBtn = $('#checkBtn');
var resetBtn = $('#resetBtn');

var main = $('.main');

$('.btn').click(function() {
  playSoundWav('btnSound');
})

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
  guessDisplayBox.removeClass('indicatorBorder');
  guessDisplayBox.removeAttr('disabled');
  randomNumberAll.removeClass('indicatorPulse');
  main.removeClass('indicatorBreathe');
  startBtn.removeAttr('disabled');
  checkBtn.removeAttr('disabled');
  statusResult.text('Hello! Click the Start Button to begin :)')
  clearInterval(timeCount);
  countDownTime.text('TIMER');
}

function initializeApp () {
  statusResult.finish();
  statusResult.text('Guess the numbers from below. You got it!')
  randomArray = pick_number();
  randomNumber1.text('?').addClass('indicatorPulse');
  randomNumber2.text('?').addClass('indicatorPulse');
  randomNumber3.text('?').addClass('indicatorPulse');
  randomNumber4.text('?').addClass('indicatorPulse');

//Create a timer
  timer(60);


  $(document).on('keydown', function(event) {
    var keycode = event.keyCode;
    if (keycode == '13') {
      make_guess();
      playSoundWav('btnSound');
    }
  })

//CHECK GAME
  startBtn.attr('disabled', 'true');
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

  for (var j = 0; j < guessArray.length; j++) {
    if (guessArray[j] === randomArray[j]) {
      $(`#guessBox-${j + 1}`).attr('disabled', 'true');
      $(`#randomNumber${j + 1}`).text(guessArray[j]);
      $(`#randomNumber${j + 1}`).removeClass('indicatorPulse');
      if (!($(`#guessBox-${j + 1}`).hasClass('indicatorBorder'))) {
        playSoundWav('correct');
        $(`#guessBox-${j + 1}`).addClass('indicatorBorder');
      }
    } else if (guessArray[j] > randomArray[j]) {
      $(`#guessBox-${j + 1}`).val('');
      $(`.arrowDown-${j + 1}`).addClass('indicatorColor');
      setTimeout(function() {
        $('.arrow').removeClass('indicatorColor');
      }, 1000)
    } else if (guessArray[j] < randomArray[j]) {
      $(`#guessBox-${j + 1}`).val('');
      $(`.arrowUp-${j + 1}`).addClass('indicatorColor');;
      setTimeout(function () {
        $('.arrow').removeClass('indicatorColor');
      }, 1000)
    }
  }
  guessString = guessArray.join('');
  randomString = randomArray.join('');
  if (guessString === randomString) {
    statusResult.text('You Won! Press reset to play again');
    clearInterval(timeCount);
    countDownTime.text('NICE!')
    main.addClass('indicatorBreathe');
    playSoundMp3('victory');
    //DO CODE WHEN WON
  }

}

function timer(time) {
  var countDown = time;

  timeCount = setInterval(function() {
    countDownTime.text(countDown);
    countDown -=1
    if (countDown < 0) {
      clearInterval(timeCount);
      countDownTime.text('TIMES UP!');
      $('.guess__Display-box').attr('disabled', 'true');
      checkBtn.attr('disabled', 'true');
      playSoundMp3('wrong');
      statusResult.text('You lost! Click reset to try again!')
      main.addClass('gameOver');

      setTimeout(function() {
        main.removeClass('gameOver');
      }, 200)
    }
  }, 1000)
}

function playSoundWav(name) {
  var audio = new Audio(`sounds/${name}.wav`);
  audio.play();
}

function playSoundMp3(name) {
  var audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}
