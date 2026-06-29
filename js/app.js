/*-------------------------------- Constants --------------------------------*/
const finishCriteria = 25
/*-------------------------------- Variables --------------------------------*/
let sequence = []
let userInput = []
let currentGameMode = 'Simon'
/*------------------------ Cached Element References ------------------------*/

const topLeft = document.querySelector('.top-left')
const topRight = document.querySelector('.top-right')
const bottomLeft = document.querySelector('.bottom-left')
const bottomRight = document.querySelector('.bottom-right')

const gameMode = document.querySelector('#gameMode')

/*----------------------------- Event Listeners -----------------------------*/

topLeft.addEventListener('click', () => { console.log(topLeft) })
topRight.addEventListener('click', () => { console.log(topRight) })
bottomLeft.addEventListener('click', () => { console.log(bottomLeft) })
bottomRight.addEventListener('click', () => { console.log(bottomRight) })

//Set game mode
gameMode.addEventListener('change', () => {
    if (gameMode.checked) {
        currentGameMode = 'Training'
    } else {
        currentGameMode = 'Simon'
    }
})

/*-------------------------------- Functions --------------------------------*/
nextSequence()

//a function to change the class of the color to '.click' when the sequence gets generated
function assignClickClass() {
    // topLeft.classList += 'click'
    // topLeft.id = 'banana'

    for (let i = 0; i < sequence.length; i++) {
        if (sequence[i] ===0){
            topLeft.id = 'active'
        }else if (sequence[i] ===1){
            topRight.id = 'active'
        }else if (sequence[i] ===2){
            bottomLeft.id = 'active'
        }else if (sequence[i] ===3){
            bottomRight.id = 'active'
        }
        else{
            //Delete after testing
            alert('Something went wrong')
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
    console.log(sequence)
 })




//Add a reset function... to reset the sequence when game mode is 'Simon',,,

//Add a function to be activated each time the user clicks the right button after the sequence,, if the sequence size is === to finishCriteria then user has won the game

//function to update the current Score each time the user clicks the right button after the sequence /// and if the current Score is > than the Best score update the BEst score too.



/*--------------------------------------------------------------------------------*/
/*-------------------------------- Code GraveYard --------------------------------*/
/*--------------------------------------------------------------------------------*/