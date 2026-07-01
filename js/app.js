let finishCriteria = 5
let sequence = []
let userInput = []
let currentGameMode = 'Simon'
let gameStart = false
let currentScore = 0
let bestScore = 0
let currentIndexToPress = 0
let timeOut = 1000
let i = 0

const topLeftEl = document.querySelector('.top-left')
const topRightEl = document.querySelector('.top-right')
const bottomLeftEl = document.querySelector('.bottom-left')
const bottomRightEl = document.querySelector('.bottom-right')
const gameModeEl = document.querySelector('#gameMode')
const currentScoreEl = document.querySelector('#currentScore')
const BestScoreEl = document.querySelector('#bestScore')
const startEl = document.querySelector('#start')
const popupEl = document.querySelector('#popup')
const diffSelectorEl = document.querySelector('#difficulty')
const youWinImgEl = document.querySelector('#youWinImg')
const youLoseImgEl = document.querySelector('#youLoseImg')
const gameStatusParagraphEl = document.querySelector('#gameStatusParagraph')
const resetbuttonEl = document.querySelector('#resetGame')

topLeftEl.addEventListener('click', () => {
    playSound('Assets_Audio_A7.ogg')
    userInput.push(0)
    buttonPress()
})
topRightEl.addEventListener('click', () => {
    playSound('Assets_Audio_C2.ogg')
    userInput.push(1)
    buttonPress()
})
bottomLeftEl.addEventListener('click', () => {
    playSound('Assets_Audio_D7.ogg')
    userInput.push(2)
    buttonPress()
})
bottomRightEl.addEventListener('click', () => {
    playSound('Assets_Audio_G2.ogg')
    userInput.push(3)
    buttonPress()
})
resetbuttonEl.addEventListener('click', () => {
    sequence = []
    userInput = []
    popupEl.style.display = 'none'
    startEl.textContent = 'START'
})

gameModeEl.addEventListener('change', () => {
    if (gameModeEl.checked) {
        currentGameMode = 'Training'
    } else {
        currentGameMode = 'Simon'
    }
})

diffSelectorEl.addEventListener('change', () => {
    if (diffSelectorEl.value === 'easy') {
        finishCriteria = 5
        timeOut = 1000
    } else if (diffSelectorEl.value === 'normal') {
        finishCriteria = 25
        timeOut = 800
    } else if (diffSelectorEl.value === 'unlimited') {
        finishCriteria = Infinity
        timeOut = 500
    }
})

startEl.addEventListener('click', () => {
    console.log('pressed')
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
            } else {
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
    if (startEl.textContent === 'START') {
        startEl.textContent = 'ON'
        localFunction(0)
    } else if (startEl.textContent === 'ON') {
        startEl.textContent = 'OFF'
        localFunction(1)
    } else if (startEl.textContent === 'OFF') {
        startEl.textContent = 'ON'
        localFunction(2)
    }
}
)

const playSound = (toPlay) => {
    const audioElement = new Audio(`assets/Audio/${toPlay}`)
    audioElement.volume = 1.0
    audioElement.play()
}

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

function assignClickClass() {

    if (i >= sequence.length) {
        i = 0
        topLeftEl.inert = false
        topRightEl.inert = false
        bottomLeftEl.inert = false
        bottomRightEl.inert = false
        return
    } else {
        if (sequence[i] === 0) {
            topLeftEl.id = 'active'
            playSound('Assets_Audio_A7.ogg')
            setTimeout(() => { topLeftEl.id = '' }, timeOut)

        } else if (sequence[i] === 1) {
            topRightEl.id = 'active'
            playSound('Assets_Audio_C2.ogg')
            setTimeout(() => { topRightEl.id = '' }, timeOut)

        } else if (sequence[i] === 2) {
            bottomLeftEl.id = 'active'
            playSound('Assets_Audio_D7.ogg')
            setTimeout(() => { bottomLeftEl.id = '' }, timeOut)

        } else if (sequence[i] === 3) {
            bottomRightEl.id = 'active'
            playSound('Assets_Audio_G2.ogg')
            setTimeout(() => { bottomRightEl.id = '' }, timeOut)

        } else {
            i = 0
            return
        }

        i++
        setTimeout(() => {
            assignClickClass()
        }, timeOut + 100)

    }

}

function nextSequence() {
    sequence.push(Math.floor(Math.random() * 4))
    console.log(sequence)
    assignClickClass()
}

function resetSequence() {
    if (currentGameMode === 'Simon') {
        sequence = []
        console.log(sequence)
        currentScore = 0
        topLeftEl.inert = true
        topRightEl.inert = true
        bottomLeftEl.inert = true
        bottomRightEl.inert = true
        startEl.classList = ''
        gameStart = false
        startEl.textContent = 'OFF'
        userInput = []
        currentIndexToPress = 0


    } else if (currentGameMode === 'Training') {
        console.log('game mode is training, cannnot reset the sequence!')
        console.log(sequence)

    }
}

function buttonPress() {
    let statusFailed = false
    console.log('userinput: ' + userInput)
    if (userInput.length === sequence.length) {
        for (let index = 0; index < userInput.length; index++) {
            console.log('index= ' + index + '... current sequence: ' + sequence[index] + ' ... user pressed: ' + userInput[index])
            if (parseInt(userInput[index]) === parseInt(sequence[index])) {
                console.log('correct button')
            } else {
                console.log('incorrect button')
                if (currentGameMode === 'Simon') {
                    let lastscore = currentScore
                    resetSequence()
                    playSound('lose.mp3')
                    youLoseImgEl.style.display = 'block'
                    youWinImgEl.style.display = 'none'
                    gameStatusParagraphEl.textContent = `Game Over! Your final score was ${lastscore}. Click Restart to play again.`
                    statusFailed = true
                    popupEl.style.display = 'flex'
                } else if (currentGameMode === 'Training') {
                    playSound('lose.mp3')
                    userInput = []
                    assignClickClass()
                    return
                }
            }
        }
        if (currentIndexToPress === finishCriteria) {
            playSound('win.mp3')
            youLoseImgEl.style.display = 'none'
            youWinImgEl.style.display = 'block'
            gameStatusParagraphEl.textContent = `Victory! Your memory is perfect. You reached the max score of ${currentScore}!`
            popupEl.style.display = 'flex'
            gameStart = false
            startEl.classList = ''
            topLeftEl.inert = true
            topRightEl.inert = true
            bottomLeftEl.inert = true
            bottomRightEl.inert = true
        }
        else if (!statusFailed) {
            setcurrentScore()
            currentIndexToPress++
            topLeftEl.inert = true
            topRightEl.inert = true
            bottomLeftEl.inert = true
            bottomRightEl.inert = true
            setTimeout(() => {
                nextSequence()
            }, 1000)
        }
        userInput = []
    }
}