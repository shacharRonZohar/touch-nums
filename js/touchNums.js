'use strict'

var gNums
var gNextCorrectNum
var gGameIsOn
var gTimePassedInSeconds
var gCurrLevel = 16
var gGameTimer
var gIsRandomMode
var gNextRandNums = []
var gMaxNum

function init() {
    clearInterval(gGameTimer)
    gGameIsOn = false
    gTimePassedInSeconds = 0
    gMaxNum = gCurrLevel
    gNums = shuffle(createNums(gMaxNum))
    console.log('gNums', gNums)
    if (gIsRandomMode) {
        gNextRandNums = shuffle(gNums.slice())
        gMaxNum = gNextCorrectNum[0]
    }
    gNextCorrectNum = gIsRandomMode ? gNextRandNums.pop() : 1
    document.querySelector('.modal').style.display = 'none'
    document.querySelector('.timer-display span').innerText = '0'
    document.querySelector('.next-num-display span').innerText = gNextCorrectNum
    renderBoard()
}

function startGame() {
    gGameIsOn = true
}

function toggleRandomMode(elBtn) {
    gIsRandomMode = !gIsRandomMode
    elBtn.classList.toggle('on')
    elBtn.querySelector('span').innerText = gIsRandomMode ? 'On' : 'Off'
    init()
}

function renderBoard(boardSize = Math.sqrt(gCurrLevel)) {
    var htmlStr = ''
    for (var i = 0; i < boardSize; i++) {
        htmlStr += '<tr>'
        for (var j = 0; j < boardSize; j++) {
            const currNum = gNums.pop()
            htmlStr += `<td class="cell unmarked" onclick="cellClicked(this,${currNum})">${currNum}</td>`
        }
        htmlStr += '</tr>'
    }
    document.querySelector('.board').innerHTML = htmlStr
}

function createNums(maxNum) {
    var nums = []
    for (var i = 1; i <= maxNum; i++) {
        nums.push(i)
    }
    return nums
}

function cellClicked(elCell, clickedNum) {
    if (!gGameIsOn) return
    if (clickedNum !== gNextCorrectNum) return flickerClass(elCell, 'marked-wrong')
    if (clickedNum === 1) gGameTimer = setInterval(countTime, 1000)
    elCell.classList.add('marked')
    console.log('gNextRandNums', gNextRandNums)
        // const maxNum = gIsRandomMode ? g : gMaxNum
    gIsRandomMode ? gNextCorrectNum = gNextRandNums.pop() : gNextCorrectNum++
        document.querySelector('.next-num-display span').innerText = gNextCorrectNum
    if (gNextCorrectNum === gMaxNum) return showVictorious()
    else flickerClass(elCell, 'marked-last')
}

function changeDiff(maxNum) {
    gCurrLevel = maxNum
    init()
}

function showVictorious() {
    gGameIsOn = false
    document.querySelector('.modal').style.display = 'block'
    clearInterval(gGameTimer)
}

function flickerClass(el, className) {
    el.classList.remove('unmarked')
    const classToAddAfter = (className === 'marked-wrong') ? 'unmarked' : 'marked'
    el.classList.add(className)
    setTimeout(function() {
        el.classList.remove(className)
        el.classList.add(classToAddAfter)
    }, 700)
}