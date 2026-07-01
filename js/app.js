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
    userInput.push(0)
    buttonPress()
    // buttonPress(0)
})
topRightEl.addEventListener('click', () => {
    // console.log('clicked topRightEl')
    userInput.push(1)
    buttonPress()
    // buttonPress(1)
})
bottomLeftEl.addEventListener('click', () => {
    // console.log('clicked bottomLeftEl')
    userInput.push(2)
    buttonPress()
    // buttonPress(2)
})
bottomRightEl.addEventListener('click', () => {
    // console.log('clicked bottomRightEl')
    userInput.push(3)
    buttonPress()
    // buttonPress(3)
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

    const localFunction = (cond) => {

        if (cond === 0) {
        gameStart = true
        nextSequence()
        startEl.classList = 'active'
        topLeftEl.inert = false
        topRightEl.inert = false
        bottomLeftEl.inert = false
        bottomRightEl.inert = false
        } 
        else if (cond === 1) {
        gameStart = false
        startEl.classList = ''
        topLeftEl.inert = true
        topRightEl.inert = true
        bottomLeftEl.inert = true
        bottomRightEl.inert = true
        }       
        else if (cond === 2) {

            if (sequence.length === 0) {
                gameStart = true
                nextSequence()
                startEl.classList = 'active'
                topLeftEl.inert = false
                topRightEl.inert = false
                bottomLeftEl.inert = false
                bottomRightEl.inert = false
            }else{
                i = 0
                assignClickClass()
                gameStart = true
                startEl.classList = 'active'
                topLeftEl.inert = false
                topRightEl.inert = false
                bottomLeftEl.inert = false
                bottomRightEl.inert = false
            }

        }       
    }
    
    if (startEl.textContent === 'Start' ) {
        startEl.textContent = 'On'
        localFunction(0)

    } else if (startEl.textContent === 'On') {
        startEl.textContent = 'Off'
        localFunction(1)
    }else if ( startEl.textContent === 'Off'){
        startEl.textContent = 'On'
        localFunction(2)
    }
}
)
/*-------------------------------- Functions --------------------------------*/

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



let i = 0
function assignClickClass() {
        
        if (i >= sequence.length) {
            // console.log(' 1 sequence length: ' + sequence.length + '. i= ' + i)
            i = 0
            return
        } else {
            
            

                if (sequence[i] === 0) {
                    topLeftEl.id = 'active'
                    setTimeout(() => { topLeftEl.id = '' }, timeOut)
                    
                } else if (sequence[i] === 1) {
                    topRightEl.id = 'active'
                    setTimeout(() => { topRightEl.id = '' }, timeOut)
                    
                } else if (sequence[i] === 2) {
                    bottomLeftEl.id = 'active'
                    setTimeout(() => { bottomLeftEl.id = '' }, timeOut)
                    
                } else if (sequence[i] === 3) {
                    bottomRightEl.id = 'active'
                    setTimeout(() => { bottomRightEl.id = '' }, timeOut)
                    
                } else {
                    // console.log(' Something went wrong... sequence length: ' + sequence.length + '. i= ' + i)
                    i = 0
                    return
                }
                
                console.log('index to press: ' + currentIndexToPress+ '. i= ' + i)
                i++
                setTimeout(() => { 
                    assignClickClass()
                }, timeOut+100)
                
                // console.log(' 3 sequence length: ' + sequence.length + '. i= ' + i)
                console.log('user needs to play: ' + (currentIndexToPress+1))

            
            
        }
        
}


// function to add a new button/ to the sequence array...  || generates the same number time after the another alot
function nextSequence() {
    sequence.push(Math.floor(Math.random() * 4))
    console.log(sequence)
    assignClickClass()
    // currentIndexToPress = 0 
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
        userInput = []
        currentIndexToPress = 0
        
        
    } else if (currentGameMode === 'Training') {
        console.log('game mode is training, cannnot reset the sequence!')
        console.log(sequence)
        
    }
}

//Add a function to be activated each time the user clicks the right button after the sequence,, if the sequence size is === to finishCriteria then user has won the game
function buttonPress() {
    
    let statusFailed = false
    // console.log('outside the for loop')
    
    console.log('userinput: '+userInput)
    
    if ( userInput.length === sequence.length){
        
        
        for (let index = 0; index < userInput.length ; index++) {
            
        console.log('index= ' + index + '... current sequence: '+ sequence[index]+ ' ... user pressed: '+ userInput[index])
        
        if ( parseInt(userInput[index])  === parseInt(sequence[index])) {
            
            console.log('correct button')
            
            
            
        } else {
            // User pressed 
            //check game mode.. if = 'Simon' set game as finished.. gameover/user lost.. give user a way to start again without resetting Best Score
            console.log('incorrect button')
            
            if (currentGameMode === 'Simon'){
                resetSequence()
                statusFailed = true
            }else if (currentGameMode === 'Training'){
                userInput = []
                assignClickClass()
                return
            }
            
            //Show to user that the game ended because they entered wrong button..
            //set startbutton to inactive.. buttons inert etc...
        }
    }
    
    if (currentIndexToPress === finishCriteria) {
        //set game as finished || user Won
        gameStart = false
        
        startEl.classList = ''
        
        topLeftEl.inert = true
        topRightEl.inert = true
        bottomLeftEl.inert = true
        bottomRightEl.inert = true
        
    }
    else if (!statusFailed) {
        setcurrentScore()
        nextSequence()
        currentIndexToPress++
    }
    userInput = []
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
    

    
    // //Add a function to be activated each time the user clicks the right button after the sequence,, if the sequence size is === to finishCriteria then user has won the game
    // function buttonPress(button) {
        
    //     // console.log('outside the for loop')
    
    //     for (let index = 0; index <= currentIndexToPress; index++) {
        
    //         console.log('index= ' + index + '... current sequence: '+ sequence[index]+ ' ... user pressed: '+ button)
    
    //         if ( parseInt(button)  === parseInt(sequence[index])) {
        
    //             console.log('correct button')
    
    //             if (currentIndexToPress === finishCriteria) {
        //                 //set game as finished || user Won
        //                 gameStart = false
        
        //                 startEl.classList = ''
        
        //                 topLeftEl.inert = true
        //                 topRightEl.inert = true
        //                 bottomLeftEl.inert = true
        //                 bottomRightEl.inert = true
        
        //             }
        
        //             nextSequence()
        
        //         } else {
            //             // User pressed 
            //             //check game mode.. if = 'Simon' set game as finished.. gameover/user lost.. give user a way to start again without resetting Best Score
            //             console.log('incorrect button')
            //             resetSequence()
            
            
            //             //maybe the following needs to be in teh reset function
            //             //Show to user that the game ended because they entered wrong button..
            //             //set startbutton to inactive.. buttons inert etc...
            //         }
            //     }
            // }
            


            
                // if (!gameStart) {
                //     gameStart = true
                //     nextSequence()
                //     startEl.classList = 'active'
                //     topLeftEl.inert = false
                //     topRightEl.inert = false
                //     bottomLeftEl.inert = false
                //     bottomRightEl.inert = false
                // } else {
                //     gameStart = false
                //     startEl.classList = ''
                //     topLeftEl.inert = true
                //     topRightEl.inert = true
                //     bottomLeftEl.inert = true
                //     bottomRightEl.inert = true
                // }