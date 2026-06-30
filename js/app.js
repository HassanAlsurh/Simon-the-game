/*-------------------------------- Constants --------------------------------*/
const finishCriteria = 25
/*-------------------------------- Variables --------------------------------*/
let sequence = []
let userInput = []
let currentGameMode = 'Simon'
let gameStart = false
let currentScore = 0
let bestScore = 0
let currentIndexToPress = 0
/*------------------------ Cached Element References ------------------------*/

const topLeft = document.querySelector('.top-left')
const topRight = document.querySelector('.top-right')
const bottomLeft = document.querySelector('.bottom-left')
const bottomRight = document.querySelector('.bottom-right')
const gameMode = document.querySelector('#gameMode')
const currentScoreEl = document.querySelector('#currentScore')
const BestScoreEl = document.querySelector('#bestScore')
const startEl = document.querySelector('#start')


/*----------------------------- Event Listeners -----------------------------*/

topLeft.addEventListener('click', () => {
    console.log('clicked topLeft')
    buttonPress(0)
})
topRight.addEventListener('click', () => {
    console.log('clicked topRight')
    buttonPress(1)
})
bottomLeft.addEventListener('click', () => {
    console.log('clicked bottomLeft')
    buttonPress(2)
})
bottomRight.addEventListener('click', () => {
    console.log('clicked bottomRight')
    buttonPress(3)
})

//Set game mode
gameMode.addEventListener('change', () => {
    if (gameMode.checked) {
        currentGameMode = 'Training'
    } else {
        currentGameMode = 'Simon'
    }
})

startEl.addEventListener('click',()=>{
    if (!gameStart){
        gameStart = true
        nextSequence()
        startEl.classList = 'active'
    }else{
        gameStart = flase
    }
})
/*-------------------------------- Functions --------------------------------*/
// if teh user clicks the start button,, add class to teh button '.active' and call the function:
// nextSequence()


function setcurrentScore() {

    currentScore = sequence.length
    currentScoreEl.textContent = `Current Score: ${currentScore}`
    if (currentScore > bestScore) {
        bestScore = currentScore
        BestScoreEl.textContent = `Best Score: ${bestScore}`
    }


    // console.log('currentScore: '+currentScore +' bestScore: '+ bestScore)
}

//a function to change the class of the color to '.click' when the sequence gets generated
function assignClickClass() {
    // topLeft.classList += 'click'
    // topLeft.id = 'banana'

    for (let i = 0; i < sequence.length; i++) {
        if (sequence[i] === 0) {
            topLeft.id = 'active'
        } else if (sequence[i] === 1) {
            topRight.id = 'active'
        } else if (sequence[i] === 2) {
            bottomLeft.id = 'active'
        } else if (sequence[i] === 3) {
            bottomRight.id = 'active'
        }
    }
}


// function to add a new button/ to the sequence array...  || generates the same number time after the another alot
function nextSequence() {
    sequence.push(Math.floor(Math.random() * 4))
    console.log(sequence)
    assignClickClass()
}


//for testing
topLeft.addEventListener('click', () => {
    nextSequence()
    setcurrentScore()
    // console.log(sequence)
})




//Add a reset function... to reset the sequence when game mode is 'Simon',,,

//Add a function to be activated each time the user clicks the right button after the sequence,, if the sequence size is === to finishCriteria then user has won the game
function buttonPress(button) {
    if (button === sequence[currentIndexToPress]){

        if(currentIndexToPress === finishCriteria){
            //set game as finished || user Won
        }
        currentIndexToPress++
    }
    else{
        //check game mode.. if 'Simon' set game as finished.. gameover/user lost.. give user a way to start again without resetting Best Score
    }
}


//function to update the current Score each time the user clicks the right button after the sequence /// and if the current Score is > than the Best score update the BEst score too.



/*--------------------------------------------------------------------------------*/
/*-------------------------------- Code GraveYard --------------------------------*/
/*--------------------------------------------------------------------------------*/
