let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
const startX = canvas.width/2-2;
const startY = canvas.height-1;
let player1X = startX;
let player1Y = startY;
let player1dx = 0;
let player1dy = -1;


ctx.strokeStyle= "#ffffff";
ctx.rect(0,0, canvas.width, canvas.height);
ctx.stroke();


function checkWall(actualPositionX,actualPositionY, actualHorizontalDirection, actualVerticalDirection){
    let imageData = ctx.getImageData(actualPositionX+(actualHorizontalDirection*2), actualPositionY+(actualVerticalDirection*2),1,1).data;
    return imageData[0]+imageData[1]+imageData[2]!=0;
}

function controlPlayerDirection(){
    if(checkWall(player1X,player1Y,player1dx,player1dy)){
        player1dx = player1dx == 0? (Math.random() < 0.5 ? -1 : 1) : 0;
        player1dy = player1dy == 0? (Math.random() < 0.5 ? -1 : 1) : 0;
        controlPlayerDirection();
    }
}


function drawPlayer() {
    ctx.beginPath();
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(player1X, player1Y, 1, 1);
}



function draw() {
    
    controlPlayerDirection();
    drawPlayer();

    console.log(checkWall(player1X,player1Y,player1dx,player1dy));
    
    player1X += player1dx;
    player1Y += player1dy;
}

setInterval(draw, 3);