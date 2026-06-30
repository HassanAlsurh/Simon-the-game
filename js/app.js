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
let timeOut = 1000
/*------------------------ Cached Element References ------------------------*/

const topLeftEl = document.querySelector('.top-left')
const topRightEl = document.querySelector('.top-right')
const bottomLeftEl = document.querySelector('.bottom-left')
const bottomRightEl = document.querySelector('.bottom-right')
const gameModeEl = document.querySelector('#gameMode')
const currentScoreEl = document.querySelector('#currentScore')
const BestScoreEl = document.querySelector('#bestScore')
const startEl = document.querySelector('#start')


/*----------------------------- Event Listeners -----------------------------*/

topLeftEl.addEventListener('click', () => {
    // console.log('clicked topLeftEl')
    buttonPress(0)
})
topRightEl.addEventListener('click', () => {
    // console.log('clicked topRightEl')
    buttonPress(1)
})
bottomLeftEl.addEventListener('click', () => {
    // console.log('clicked bottomLeftEl')
    buttonPress(2)
})
bottomRightEl.addEventListener('click', () => {
    // console.log('clicked bottomRightEl')
    buttonPress(3)
})

//Set game mode
gameModeEl.addEventListener('change', () => {
    if (gameModeEl.checked) {
        currentGameMode = 'Training'
    } else {
        currentGameMode = 'Simon'
    }
})

startEl.addEventListener('click', () => {
    if (!gameStart) {
        gameStart = true
        nextSequence()
        startEl.classList = 'active'
        topLeftEl.inert = false
        topRightEl.inert = false
        bottomLeftEl.inert = false
        bottomRightEl.inert = false
    } else {
        gameStart = false
        startEl.classList = ''
        topLeftEl.inert = true
        topRightEl.inert = true
        bottomLeftEl.inert = true
        bottomRightEl.inert = true
    }

    if (startEl.textContent === 'Start' || startEl.textContent === 'Off') {
        startEl.textContent = 'On'
    } else if (startEl.textContent === 'On') {
        startEl.textContent = 'Off'
    }
}
)
/*-------------------------------- Functions --------------------------------*/
// if teh user clicks the start button,, add class to teh button '.active' and call the function:
// nextSequence()

topLeftEl.inert = true
topRightEl.inert = true
bottomLeftEl.inert = true
bottomRightEl.inert = true

function setcurrentScore() {
    currentScore = sequence.length
    currentScoreEl.textContent = `Current Score: ${currentScore}`
    if (currentScore > bestScore) {
        bestScore = currentScore
        BestScoreEl.textContent = `Best Score: ${bestScore}`
    }
}

//a function to change the class of the color to '.click' when the sequence gets generated
//add a timeout to onlt flash the class(color) and then it turns off.. so it looks like a glow of light
let i = 0
function assignClickClass() {

    // for (let i = 0; i < sequence.length; i++) {
    // }

    if (i > sequence.length) {
        // console.log(' 1 sequence length: ' + sequence.length + '. i= ' + i)
        i = 0
        return
    } else {
        
        if (sequence[i] === 0) {
            topLeftEl.id = 'active'
            setTimeout(() => { topLeftEl.id = '' }, timeOut)
            // assignClickClass()

        } else if (sequence[i] === 1) {
            topRightEl.id = 'active'
            setTimeout(() => { topRightEl.id = '' }, timeOut)
            // assignClickClass()

        } else if (sequence[i] === 2) {
            bottomLeftEl.id = 'active'
            setTimeout(() => { bottomLeftEl.id = '' }, timeOut)
            // assignClickClass()

        } else if (sequence[i] === 3) {
            bottomRightEl.id = 'active'
            setTimeout(() => { bottomRightEl.id = '' }, timeOut)
            // assignClickClass()
            
        } else {
            // console.log(' Something went wrong... sequence length: ' + sequence.length + '. i= ' + i)
            i = 0
            return
        }
        
        // console.log(' 2 sequence length: ' + sequence.length + '. i= ' + i)
        i++
        setTimeout(() => { 
            assignClickClass()
        }, timeOut+100)
        // console.log(' 3 sequence length: ' + sequence.length + '. i= ' + i)
        // console.log(sequence)

    }

}


// function to add a new button/ to the sequence array...  || generates the same number time after the another alot
function nextSequence() {
    sequence.push(Math.floor(Math.random() * 4))
    console.log(sequence)
    assignClickClass()
    // currentIndexToPress++
}


//Add a reset function... to reset the sequence when game mode is 'Simon',,,
function resetSequence() {
    if (currentGameMode === 'Simon') {
        sequence = []
        console.log(sequence)
        currentScore = 0
        //maybe I will need other things here.. like , turn start = false and buttons to be inert etc...
        topLeftEl.inert = true
        topRightEl.inert = true
        bottomLeftEl.inert = true
        bottomRightEl.inert = true
        startEl.classList = ''
        gameStart = false
        startEl.textContent = 'Off'


    } else if (currentGameMode === 'Training') {
        console.log('game mode is training, cannnot reset the sequence!')
        console.log(sequence)

    }
}

//Add a function to be activated each time the user clicks the right button after the sequence,, if the sequence size is === to finishCriteria then user has won the game
function buttonPress(button) {

    // console.log('outside the for loop')

    for (let index = 0; index <= currentIndexToPress; index++) {

        console.log('index= ' + index + '... current sequence: '+ sequence[index]+ ' ... user pressed: '+ button)

        if ( parseInt(button)  === parseInt(sequence[index])) {

            console.log('correct button')

            if (currentIndexToPress === finishCriteria) {
                //set game as finished || user Won
                gameStart = false

                startEl.classList = ''

                topLeftEl.inert = true
                topRightEl.inert = true
                bottomLeftEl.inert = true
                bottomRightEl.inert = true

            }

            nextSequence()

        } else {
            // User pressed 
            //check game mode.. if = 'Simon' set game as finished.. gameover/user lost.. give user a way to start again without resetting Best Score
            console.log('incorrect button')
            resetSequence()
            

            //maybe the following needs to be in teh reset function
            //Show to user that the game ended because they entered wrong button..
            //set startbutton to inactive.. buttons inert etc...
        }
    }
}


//function to update the current Score each time the user clicks the right button after the sequence /// and if the current Score is > than the Best score update the BEst score too.



/*--------------------------------------------------------------------------------*/
/*-------------------------------- Code GraveYard --------------------------------*/
/*--------------------------------------------------------------------------------*/

// only for a button
// startEl.disabled = true
//works for other things
// topLeftEl.inert = true

// //for testing
// topLeftEl.addEventListener('click', () => {
//     nextSequence()
//     setcurrentScore()
//     // console.log(sequence)
// })
