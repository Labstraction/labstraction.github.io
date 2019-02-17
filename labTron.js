let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
const START_Y = canvas.height-1;
const colors = ["red", "yellow", "blue", "green"];
let players = [];






function init(){
    ctx.strokeStyle= "#ffffff";
    ctx.rect(0,0, canvas.width, canvas.height);
    ctx.stroke();
    for (let index = 0; index < colors.length; index++) {
        
        let player = {
            actualX : ((canvas.width-2)/(colors.length+1))*(1+index),
            actualY : START_Y,
            horizontalDirection : 0,
            verticalDirection : -1,
            color: colors[index]
        }

        players.push(player);
        
    }
 
}



function checkWall(player){
    
    let nextMoveX = player.actualX+(player.horizontalDirection*3);
    let nextMoveY = player.actualY+(player.verticalDirection*3);

    if (nextMoveX<0||nextMoveX>canvas.width) {
        return false;
    }
    if (nextMoveY<0||nextMoveY>canvas.height) {
        return false;
    }

    let imageData = ctx.getImageData(nextMoveX, nextMoveY, 1, 1).data;
    return imageData[0]+imageData[1]+imageData[2]!=0;
}

function controlPlayerMovment(player){
    if(checkWall(player)){
        player.horizontalDirection = player.horizontalDirection == 0? (Math.random() < 0.5 ? -1 : 1) : 0;
        player.verticalDirection = player.verticalDirection == 0? (Math.random() < 0.5 ? -1 : 1) : 0;
        controlPlayerMovment();
    }

    player.actualX += player.horizontalDirection;
    player.actualY += player.verticalDirection;
}


function drawPlayer(player) {
    ctx.beginPath();
    ctx.fillStyle = player.color;
    ctx.fillRect(player.actualX, player.actualY, 1, 1);
}



function draw() {
    players.forEach(player => {
        controlPlayerMovment(player);
        drawPlayer(player);
    });
    

  
}

init();

setInterval(draw, 2);