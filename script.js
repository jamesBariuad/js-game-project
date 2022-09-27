
const titleHowToPlay = document.querySelector(".titleHowToPlay");
const overlay = document.querySelector(".overlay");
const howToPlayBtn = document.querySelector(".howToPlayBtn");
const menu = document.querySelector(".menu");

//showing and removing instructions on how to play
titleHowToPlay.addEventListener("click",close);
howToPlayBtn.addEventListener("click", open);

function close(){
    titleHowToPlay.remove(titleHowToPlay);
    overlay.remove(overlay);
}

function open(){
    document.body.appendChild(titleHowToPlay);
    document.body.appendChild(overlay);
}


//create event listener to start game
const startBtn = document.querySelector(".startBtn");
startBtn.addEventListener("click", startGame);

function startGame(){
    startBtn.remove(startBtn);
    howToPlayBtn.remove(howToPlayBtn);
    menu.textContent = "Repeat after me!";
    menu.textalign = "center";
    return counterOfLights();
};

//an array that stores the pattern of answers
let pattern = [];

//addition of classes square1 square2... to DOM array
let areasDomArray = ["square1", "square2", "square3", "square4", "square5", "square6", "square7", "square8"];
for (i=0; i<=7; i++) {
    areasDomArray[i] = document.querySelector(".square"+(i+1));
}

//initialization
let counter = 2;
function counterOfLights(){
    setTimeout(function() {
        counter++
        menu.textContent = "Repeat after me!"
        for (i=0; i<areasDomArray.length; i++){
            areasDomArray[i].removeEventListener("click", lightOnClick);
        }
        return randomizer();
    }, 1000);
}

//randomizer of what number of square to be put in pattern array
function randomizer(){
    let number = Math.floor((Math.random() * 8) +1);
    pattern.push(number)
    if (pattern.length==counter){
        return light();
    }
    else {
        randomizer()
    }
}

//makes the generated pattern light up
function light(){
    playAudio();
    for (let i = 0; i < pattern.length; i++) {
        setTimeout(function() {
            areasDomArray[pattern[i]-1].classList.add("glow");
        }, i * 1000);
        setTimeout(function() {
            areasDomArray[pattern[i]-1].classList.remove("glow");
        }, 750+(i*1000));
    }
    setTimeout(function() {
        menu.textContent = "your turn"
        for (i=0; i<areasDomArray.length; i++){
            areasDomArray[i].addEventListener("click", lightOnClick);
        }        
    }, 1000*pattern.length);
}

//makes the clicks light up on different divs, checks if the pattern of clicks is the same on the generated pattern
let patternInput = 0;
let score = 0;
let hiScore = 0;
function lightOnClick(){
    let z = this.classList.value;
    
    let audio = new Audio("audio/"+z[6]+".wav")
    audio.play()

    areasDomArray[z[6]-1].classList.add("glow")
    setTimeout(function() {
        areasDomArray[z[6]-1].classList.remove("glow")
    }, 500);


    
    if (z[6]!=pattern[patternInput]) {
        if (score<3){
            score=score;
            if (hiScore<score){
                hiScore=score
            }
        }
        else{
            score=pattern.length-1;
            if (hiScore<score){
                hiScore=score
            }
        }
        for (i=0; i<areasDomArray.length; i++){
            areasDomArray[i].removeEventListener("click", lightOnClick);
        }
        
        menu.innerHTML = "You Lose<br>Score: "+score+"<br> Hi-score:"+hiScore;
        restartBtn = document.createElement("button");
        restartBtn.textContent = "Restart?"
        menu.appendChild(restartBtn)
        menu.appendChild(howToPlayBtn);
        restartBtn.addEventListener("click", resetAll)
        return score;
    }
    else if (patternInput+1==pattern.length) {
        patternInput = 0;
        return counterOfLights()
    }  
    patternInput++
    score++
}

//resets variables on new game
function resetAll(){
    pattern = [];
    counter = 2;
    patternInput = 0;
    restartBtn.remove(restartBtn);
    score = 0;
    return startGame();
}

function playAudio(){
    for (let i = 0; i < pattern.length; i++) {
        setTimeout(function() {
            let audio = new Audio("audio/"+(pattern[i])+".wav")
             audio.play()
        }, i * 1000);
    }
}   

// function musicIsLyf(){
//     for (i=0; i<areasDomArray.length; i++){
//         areasDomArray[i].addEventListener("click", lightOnClick);
//     }  
//     let audio = new Audio("audio/"+z[6]+".wav")
//     audio.play()
// }