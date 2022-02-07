'use strict'

function shuffle(numbers) {
    var randIdx, keep, i;
    for (i = numbers.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, numbers.length - 1);
        keep = numbers[i];
        numbers[i] = numbers[randIdx];
        numbers[randIdx] = keep;
    }
    return numbers;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function countTime() {
    var display = ''
    gTimePassedInSeconds++
    if (gTimePassedInSeconds > 60) {
        const seconds = ((gTimePassedInSeconds % 60) < 10) ? '0' + gTimePassedInSeconds % 60 : gTimePassedInSeconds % 60
        display = parseInt(gTimePassedInSeconds / 60) + ' : ' + seconds
    } else display = gTimePassedInSeconds
    document.querySelector('.timer-display span').innerText = display
}