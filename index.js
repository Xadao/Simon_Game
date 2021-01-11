var levelNumber = 0;
var iDs = ["green", "red", "yellow", "blue"];
var sequenceList = [];
var userSequence = [];
var started = false;
      


$(document).on("keypress", function () {
    if (!started) {
        $("#level-title").text("Level " + levelNumber);
        nextSequence();
        started = true;
      }
    
})

function nextSequence(){
    userSequence = [];
    levelNumber++;
    $("#level-title").text("Level "+ levelNumber);
    var rnd = Math.round(Math.random()*3);
    var randColor = iDs[rnd];
    sequenceList.push(randColor);
    $("#"+randColor).fadeOut(200).fadeIn(200);
    var audio = new Audio("//sounds/"+randColor+".mp3");
    audio.play();
}
$(".btn").on("click", function () {
    var clickedId = $(this).attr("id");
    userSequence.push(clickedId); 
    var audio = new Audio("//sounds/"+clickedId+".mp3");
    audio.play();
    $(this).addClass("pressed");
    setTimeout(function() {$("#"+clickedId).removeClass("pressed"); }, 200);
    checkSequence(userSequence.length-1); 
    
})
function checkSequence (currLevel){
    if (sequenceList[currLevel] === userSequence[currLevel]) {
        if (userSequence.length === sequenceList.length) {
         setTimeout(nextSequence, 1000);
        }
        
    }else{
        $("#level-title").text("Sajnos vesztettél, az újrkezdéshez nyomj meg 1 billentyűt!");
        var audio = new Audio("//sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {$("body").removeClass("game-over");}, 300);
        levelNumber = 0;
        sequenceList = [];
        started = false;
    }
}
