var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


$(document).keypress(function () {
    if (!started) {

        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
});

$(".btn").on("click", function(event){
    var userChosenColor = event.target.id;

    PlaySound(userChosenColor);
    animatePress(userChosenColor);
    
    userClickedPattern.push(userChosenColor);
    
    CheckAnswer(userClickedPattern.length-1)
});

function nextSequence()
{

    level +=1;
    $("#level-title").text("Level " + level);

    randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+gamePattern[gamePattern.length-1]).fadeOut(150).fadeIn(150);
    PlaySound(gamePattern[gamePattern.length-1]);

}

function CheckAnswer (currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        if (userClickedPattern.length === gamePattern.length){
        setTimeout(nextSequence(), 1000);
        userClickedPattern = [];        
     }
    }
    else {
        PlaySound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass('game-over');
        }, 250);    
        $("h1").text("Game Over, Press Any Key to Restart");
        StartOver();
    }
}


function PlaySound(name) {
    var sound = new Audio("sounds/"+name+".mp3");
    sound.play();
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass('pressed');
    }, 150);
}


function StartOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

