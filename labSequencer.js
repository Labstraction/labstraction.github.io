'use strict'


let waveType = "saw";
let audioCtx;
const velocity = 200;
const gainTime = velocity/1000;
let noteValues = Object.values(note)
let canvas = document.getElementById("myCanvas");
let graphicCtx = canvas.getContext("2d");
const TILE_DIMENSION = 30;
const TILES_ROW = canvas.height / TILE_DIMENSION;
const TILES_COLUMNS = canvas.width / TILE_DIMENSION;
let tileMatrix = [];
let playedColumn = 0;
let interval;

function playNote(frequency) {
    var oscillator = audioCtx.createOscillator();
    var gain = audioCtx.createGain();
    oscillator.type = waveType;
    oscillator.frequency.value = frequency; // value in hertz
    oscillator.connect(gain)
    gain.connect(audioCtx.destination);
    oscillator.start();
    gain.gain.setTargetAtTime(0, audioCtx.currentTime, gainTime);
    oscillator.stop(audioCtx.currentTime+gainTime*5);
}



canvas.onselectstart = function () { return false; }
canvas.addEventListener("click", function (evt) {
    var mousePos = getMousePos(canvas, evt);
    let row = Math.floor(mousePos.y / TILE_DIMENSION);
    let column = Math.floor(mousePos.x / TILE_DIMENSION);
    let tile = tileMatrix[row][column];
    tile.status = tile.status + 1 === Object.keys(tileStatus).length ? 0 : tile.status + 1;
    tile.drawTile(graphicCtx);
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    playNote(noteValues[row]);
});

document.getElementById("play").addEventListener("click", function (evt) {
    
    if(interval){
        clearInterval(interval);
        interval = null;
    }else{
        interval = setInterval(refresh, velocity);
    }
    return false
})

//Get Mouse Position
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}



function init() {
    for (let i = 0; i < TILES_ROW; i++) {
        let row = [];
        for (let j = 0; j < TILES_COLUMNS; j++) {
            let tile = new Tile(TILE_DIMENSION * j, TILE_DIMENSION * i, TILE_DIMENSION, TILE_DIMENSION)
            tile.drawTile(graphicCtx);
            row.push(tile);
        }
        tileMatrix.push(row);
    }
    console.log(tileMatrix);
}


function refresh() {
    let lastPlayedColumn = playedColumn - 1 === -1 ? TILES_COLUMNS - 1 : playedColumn - 1;

    for (let i = 0; i < TILES_ROW; i++) {
        let oldTile = tileMatrix[i][lastPlayedColumn];
        oldTile.isPlayed = false;
        oldTile.drawTile(graphicCtx);
        let newTile = tileMatrix[i][playedColumn];
        newTile.isPlayed = true;
        newTile.drawTile(graphicCtx);
        if(audioCtx){
            if(newTile.status===tileStatus.active||newTile.status===tileStatus.activeLock){
                playNote(noteValues[i]);
            }
        }
        
    }

    playedColumn = playedColumn + 1 === TILES_COLUMNS ? 0 : playedColumn + 1;
    if (playedColumn === 0) {
        lifeAndDeatLogic(tileMatrix, graphicCtx);
    }


}



init();

//setInterval(refresh, velocity);


