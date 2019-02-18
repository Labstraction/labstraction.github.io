



let behaviours = (function() {

    function randomBehaviour(players){
        players.forEach(player => {
            
        });
    }

    function trackBehaviour(players){
        players.forEach(player => {
            
        });
    }

    function goAwayBeaviour(players){
        players.forEach(player => {
            
        });
    };

    let allBeahaviours = [randomBehaviour,trackBehaviour,goAwayBeaviour];

    return{
        randomBehaviour:randomBehaviour,
        trackBehaviour:trackBehaviour,
        goAwayBeaviour:goAwayBeaviour,
        allBeahaviours:allBeahaviours
    }

})();


let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
const START_Y = Math.trunc(canvas.height-1);
const COLORS = ["red", "green", "purple"];
const TAIL_LENGHT = 800;
const BLACK = "#000000";
let players = [];






function init(){
    ctx.strokeStyle= "#ffffff";
    ctx.rect(0,0, canvas.width, canvas.height);
    ctx.stroke();
    for (let index = 0; index < COLORS.length; index++) {
        
        let player = {
            actualX : Math.trunc(((canvas.width-2)/(COLORS.length+1))*(1+index)),
            actualY : START_Y,
            horizontalDirection : 0,
            verticalDirection : -1,
            color: COLORS[index],
            points:[]
            
        }

        players.push(player);
        
    }
 
}



function checkWall(player){

    console.log(player);
    
    let nextMoveX = player.actualX+(player.horizontalDirection*3);
    let nextMoveY = player.actualY+(player.verticalDirection*3);


    let imageData = ctx.getImageData(nextMoveX, nextMoveY, 1, 1).data;
    return imageData[0]+imageData[1]+imageData[2]!=0;
}

function controlPlayerMovment(player){
    if(checkWall(player)){
        player.horizontalDirection = player.horizontalDirection == 0? (Math.random() < 0.5 ? -1 : 1) : 0;
        player.verticalDirection = player.verticalDirection == 0? (Math.random() < 0.5 ? -1 : 1) : 0;
        controlPlayerMovment(player);
    }else{
        player.actualX += player.horizontalDirection;
        player.actualY += player.verticalDirection;
        point={
            x:player.actualX,
            y:player.actualY,
        }
        player.points.push(point);
        if(player.points.length>TAIL_LENGHT){
            let point = player.points.shift();
            drawPoint(point.x, point.y, BLACK);
        }
    }

    
}

function drawPlayer(player){
    drawPoint(player.actualX,player.actualY,player.color);
}

function drawPoint(x,y,color){
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
    ctx.closePath();
}



function draw() {

        players.forEach(player => {
        controlPlayerMovment(player);
        drawPlayer(player);
    });
  
}

init();

setInterval(draw, 1);


