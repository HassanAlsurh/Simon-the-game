/*-------------------------------- Constants --------------------------------*/
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
// function nextSequence(params) {
//     sequence.push()
// }

//Add a reset function... to reset the sequence when game mode is 'Simon',,,



/*--------------------------------------------------------------------------------*/
/*-------------------------------- Code GraveYard --------------------------------*/
/*--------------------------------------------------------------------------------*/