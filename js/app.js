let finishCriteria = 5
let sequences = []
let userInputs = []
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
    playSound('A7.mp3')
    userInputs.push(0)
    buttonPress()
})
topRightEl.addEventListener('click', () => {
    playSound('C2.mp3')
    userInputs.push(1)
    buttonPress()
})
bottomLeftEl.addEventListener('click', () => {
    playSound('D7.mp3')
    userInputs.push(2)
    buttonPress()
})
bottomRightEl.addEventListener('click', () => {
    playSound('G2.mp3')
    userInputs.push(3)
    buttonPress()
})
resetbuttonEl.addEventListener('click', () => {
    sequencess = []
    userInputs = []
    currentScore = 0
    currentIndexToPress = 0
    currentScoreEl.textContent = 'Current Score: 0'
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
            if (sequences.length === 0) {
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

topLeftEl.inert = true
topRightEl.inert = true
bottomLeftEl.inert = true
bottomRightEl.inert = true

function setcurrentScore() {
    currentScore = sequences.length
    currentScoreEl.textContent = `Current Score: ${currentScore}`
    if (currentScore > bestScore) {
        bestScore = currentScore
        BestScoreEl.textContent = `Best Score: ${bestScore}`
    }
}

function assignClickClass() {
    if (i >= sequences.length) {
        i = 0
        topLeftEl.inert = false
        topRightEl.inert = false
        bottomLeftEl.inert = false
        bottomRightEl.inert = false
        return
    } else {
        if (sequences[i] === 0) {
            topLeftEl.id = 'active'
            playSound('A7.mp3')
            setTimeout(() => { topLeftEl.id = '' }, timeOut)
        } else if (sequences[i] === 1) {
            topRightEl.id = 'active'
            playSound('C2.mp3')
            setTimeout(() => { topRightEl.id = '' }, timeOut)
        } else if (sequences[i] === 2) {
            bottomLeftEl.id = 'active'
            playSound('D7.mp3')
            setTimeout(() => { bottomLeftEl.id = '' }, timeOut)
        } else if (sequences[i] === 3) {
            bottomRightEl.id = 'active'
            playSound('G2.mp3')
            setTimeout(() => { bottomRightEl.id = '' }, timeOut)
        } else {
            i = 0
            topLeftEl.inert = false
            topRightEl.inert = false
            bottomLeftEl.inert = false
            bottomRightEl.inert = false
            return
        }
        i++
        setTimeout(() => {
            assignClickClass()
        }, timeOut + 100)
    }
}

function nextSequence() {
    sequences.push(Math.floor(Math.random() * 4))
    assignClickClass()
}

function resetSequence() {
    if (currentGameMode === 'Simon') {
        sequences = []
        currentScore = 0
        topLeftEl.inert = true
        topRightEl.inert = true
        bottomLeftEl.inert = true
        bottomRightEl.inert = true
        startEl.classList = ''
        gameStart = false
        startEl.textContent = 'OFF'
        userInputs = []
        currentIndexToPress = 0
    }
}

function buttonPress() {
    let statusFailed = false
    if (userInputs.length === sequences.length) {
        for (let index = 0; index < userInputs.length; index++) {
            if (parseInt(userInputs[index]) === parseInt(sequences[index])) {
            } else {
                if (currentGameMode === 'Simon') {
                    let lastscore = currentScore
                    resetSequence()
                    playSound('Lose.mp3')
                    youLoseImgEl.style.display = 'block'
                    youWinImgEl.style.display = 'none'
                    gameStatusParagraphEl.textContent = `Game Over! Your final score was ${lastscore}. Click Restart to play again.`
                    statusFailed = true
                    popupEl.style.display = 'flex'
                } else if (currentGameMode === 'Training') {
                    playSound('Lose.mp3')
                    userInputs = []
                    assignClickClass()
                    return
                }
            }
        }
        if (currentIndexToPress === finishCriteria) {
            playSound('Win.mp3')
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
        userInputs = []
    }
}

const playSound = (toPlay) => {
    const audioElement = new Audio(`./assets/audio/${toPlay}`)
    audioElement.volume = 1.0
    audioElement.play()
}