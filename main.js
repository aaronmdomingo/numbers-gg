$(document).ready(init);
$('#startBtn').click(initializeApp);

var main = $('.main');

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
var levelBtn = $('.btn.level');

var easy = $('#levelEasy');
var normal = $('#levelNormal');
var hard = $('#levelHard');

$('.btn').click(function() {
  playSound('btnSound');
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

  randomArray = [];
  guessArray = [];

  disableKeys();

  easy.addClass('active');
  normal.removeClass('active');
  hard.removeClass('active');

  levelBtn.click(checkDifficulty);

  statusResult.removeClass('indicatorScroll');
  setTimeout(function() {
    statusResult.addClass('indicatorScroll');
    statusResult.text('Hello! Click the Start Button to begin :)');
  }, 10)

  guessDisplayBox.removeClass('indicatorBorder');
  guessDisplayBox.removeAttr('disabled');
  randomNumberAll.removeClass('indicatorPulse');
  main.removeClass('indicatorBreathe');
  startBtn.removeAttr('disabled');
  startBtn.addClass('indicatorColorPulse');
  checkBtn.removeAttr('disabled');
  clearInterval(timeCount);
  countDownTime.text('TIMER');
  countDownTime.removeClass('indicatorColor');
}

function initializeApp () {

  enableKeys();

  randomArray = pick_number();
  randomNumberAll.text('?').addClass('indicatorPulse');
  startBtn.removeClass('indicatorColorPulse');

  statusResult.removeClass('indicatorScroll');
  setTimeout(function() {
    statusResult.addClass('indicatorScroll');
    statusResult.text('Guess the numbers from below, you got this!')
  }, 10)

  //Timer that can be changed
  if (easy.hasClass('active')) {
    timer(30);
  } else if (normal.hasClass('active')) {
    timer(20);
  } else if (hard.hasClass('active')) {
    timer(10);
  }

//CHECK GAME
  startBtn.attr('disabled', 'true');
  checkBtn.click(make_guess);
  resetBtn.click(init);
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
  var val1 = parseInt(guessNumber1.val());
  var val2 = parseInt(guessNumber2.val());
  var val3 = parseInt(guessNumber3.val());
  var val4 = parseInt(guessNumber4.val());
  var guessString;
  var randomString;
  guessArray = [val1, val2, val3, val4];

  for (var j = 0; j < guessArray.length; j++) {
    if (guessArray[j] === randomArray[j]) {
      $(`#guessBox-${j + 1}`).attr('disabled', 'true');
      $(`#randomNumber${j + 1}`).text(guessArray[j]);
      $(`#randomNumber${j + 1}`).removeClass('indicatorPulse');
      if (!($(`#guessBox-${j + 1}`).hasClass('indicatorBorder'))) {
        playSound('correct');
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

    statusResult.removeClass('indicatorScroll');
    setTimeout(function () {
      statusResult.addClass('indicatorScroll');
      statusResult.text('You Won! Press reset to play again');
    }, 1)

    clearInterval(timeCount);
    countDownTime.text('NICE!')
    checkBtn.attr('disabled', 'true');
    main.addClass('indicatorBreathe');
    playSound('victory');
    countDownTime.removeClass('indicatorColor');
    disableKeys();
  }

}

function timer(time) {
  var countDown = time;

  timeCount = setInterval(function() {
    countDownTime.text(countDown);
    countDown -=1
    if (countDown < 10) {
      countDownTime.addClass('indicatorColor');
    }

    if (countDown < 0) {
      clearInterval(timeCount);
      disableKeys();
      countDownTime.text('TIMES UP!');
      $('.guess__Display-box').attr('disabled', 'true');
      checkBtn.attr('disabled', 'true');
      playSound('wrong');

      statusResult.removeClass('indicatorScroll');
      setTimeout(function () {
        statusResult.addClass('indicatorScroll');
        statusResult.text('You lost! Click reset to try again!');
      }, 10)

      main.addClass('gameOver');
      setTimeout(function() {
        main.removeClass('gameOver');
      }, 200)
    }
  }, 1000)
}

function loadSound() {
  var mp3Array = ['btnSound', 'correct', 'victory', 'wrong'];

  for (var i = 0 ; i < mp3Array.length ; i++) {
    createjs.Sound.registerSound(`sounds/${mp3Array[i]}.mp3`, mp3Array[i]);
  }
}

function playSound(name) {
  createjs.Sound.play(name);
}


function disableKeys() {
  document.onkeydown = function (e) {
    return false;
  }
}

function enableKeys() {
  document.onkeydown = function (e) {
    var keycode = e.keyCode;
    if (keycode == 13) {
      make_guess();
      playSound('btnSound');
    }
  }
}

function checkDifficulty() {
  var levelID = this.id;
  $(this).addClass('active');

  if (levelID === 'levelEasy') {
    normal.removeClass('active');
    hard.removeClass('active');
  } else if (levelID === 'levelNormal') {
    easy.removeClass('active');
    hard.removeClass('active');
  } else if (levelID === 'levelHard') {
    easy.removeClass('active');
    normal.removeClass('active');
  }
}
