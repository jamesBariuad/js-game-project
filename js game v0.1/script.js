// make a memorization game repeating colors

//create 1 main div
//inside it create 9 squares using loop

//create modal on how to play
const titleHowToPlay = document.querySelector(".titleHowToPlay");
const overlay = document.querySelector(".overlay");
const howToPlayBtn = document.querySelector(".howToPlayBtn");
const menu = document.querySelector(".menu");



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


//create event listener on start game
const startBtn = document.querySelector(".startBtn");
startBtn.addEventListener("click", startGame);

function startGame(){
    startBtn.remove(startBtn);
    howToPlayBtn.remove(howToPlayBtn);
    const menu = document.querySelector(".menu")
    menu.textContent = "Repeat after me!"
    menu.textalign = "center"
    return counterOfLights()
}


//make a random box picker
let pattern = [];
let areasDomArray = ["square1", "square2", "square3", "square4", "square5", "square6", "square7", "square8"];
//addition of classes to DOM array
for (i=0; i<=7; i++) {
    areasDomArray[i] = document.querySelector(".square"+(i+1));
}

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

function light(){
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



patternIndex = 0;
function lightOnClick(){
    
    // console.log(this.classList.value)
    let z = this.classList.value;
    
    areasDomArray[z[6]-1].classList.add("glow")
    setTimeout(function() {
        // this.classList.remove("glow");
      
        areasDomArray[z[6]-1].classList.remove("glow")
    }, 500);
    
    if (z[6]!=pattern[patternIndex]) {
        for (i=0; i<areasDomArray.length; i++){
            areasDomArray[i].removeEventListener("click", lightOnClick);
        }
        menu.textContent = "you lose"
        restartBtn = document.createElement("button");
        restartBtn.textContent = "restart?"
        menu.appendChild(restartBtn)
        restartBtn.addEventListener("click", resetAll)
    }
    else if (patternIndex+1==pattern.length) {
        patternIndex = 0;
         return counterOfLights()
    }  
    patternIndex++
}

function resetAll(){
    pattern = []
    counter = 2
    patternIndex = 0;
    restartBtn.remove(restartBtn)
    return startGame()
}


// function yourTurn()