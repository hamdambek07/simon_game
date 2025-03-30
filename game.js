
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;

function handler() {
    var userChosenColor = $(this).attr("id");
    var chosenButton = "sounds/" + userChosenColor + ".mp3";
    playSound(chosenButton);
    var currentColor = "#" + userChosenColor;
    animatePress(currentColor);
    checkAnswer(userChosenColor, level);
}

$(document).keydown(function() {
    nextSequence();
    $(document).off();
    $(".btn").on("click", handler);
})



function nextSequence() {
    level ++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    var audioIndex = "sounds/" + randomChosenColor + ".mp3";
    var currentColor = "#" + randomChosenColor;
    animatePress(currentColor);
    playSound(audioIndex);
  }

function playSound(name) {
    var clickSound = new Audio(name);
    clickSound.play();
}

function animatePress(currentColor) {
    $(currentColor).addClass("pressed");
    setTimeout(function() {
        $(currentColor).removeClass("pressed");
    }, 100);
}

var i = 0;

function checkAnswer(currentColor, currentLevel) {
    if (currentColor === gamePattern[i]) {
      userClickedPattern.push(currentColor);
      i ++;
      checkArray();
    } else {
      gameOver();
      $(".btn").off("click");
    }
}
  
function gameOver() {
  $("body").addClass("game-over");
  $("h1").text("Game Over, Press Any Key to Restart");
  var wrong = new Audio("sounds/wrong.mp3");
  wrong.play();
  $(document).keydown(function() {
    $("body").removeClass("game-over");
    $("h1").text("Press A Key to Start");
    gamePattern = [];
    level = 0;
    userClickedPattern = [];
    i = 0;
    $(document).on("keydown", function() {
      nextSequence();
      $(document).off();
      $(".btn").on("click", handler);
    });
  });
}

function checkArray () {
  if (userClickedPattern.length === gamePattern.length) {
    userClickedPattern = [];
    i = 0;
    setTimeout(function() {
      nextSequence();
    }, 1000)
  } 
}
