
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
const START_Y = Math.trunc(canvas.height - 1);
const COLORS = ["red", "green", "purple", "pink", "orange", "blue"];
const TAIL_LENGHT = 500;
const BLACK = "#000000";
let players = [];


let behaviours = (function (players) {

    function checkWall(player) {
        let imageData = ctx.getImageData(player.actualX + (player.horizontalDirection * 3), player.actualY + (player.verticalDirection * 3), 1, 1).data;
        return imageData[0] + imageData[1] + imageData[2] != 0;
    }

    function isDeath(player) {
        let imageData = ctx.getImageData(player.actualX + player.horizontalDirection, player.actualY + player.verticalDirection, 1, 1).data;
        if (imageData[0] + imageData[1] + imageData[2] != 0) {
            destroyPlayer(player);
            return true;
        }
        return false;
    }

    function destroyPlayer(player) {
        players.splice(players.indexOf(player), 1);
        player.points.forEach(point => {
            drawPoint(point.x, point.y, "white");
        });
    }

    function manageTail(player) {
        point = {
            x: player.actualX,
            y: player.actualY,
        }
        player.points.push(point);
        if (player.points.length > TAIL_LENGHT) {
            let point = player.points.shift();
            drawPoint(point.x, point.y, BLACK);
        }
    }

    function MovePlayer(player) {
        player.actualX += player.horizontalDirection;
        player.actualY += player.verticalDirection;
        manageTail(player)
    }

    function randomBehaviour() {
        if (isDeath(this)) {
            return;
        }
        if (checkWall(this)) {
            this.horizontalDirection = this.horizontalDirection == 0 ? (Math.random() < 0.5 ? -1 : 1) : 0;
            this.verticalDirection = this.verticalDirection == 0 ? (Math.random() < 0.5 ? -1 : 1) : 0;
            if (checkWall(this)) {
                this.horizontalDirection = this.horizontalDirection * -1
                this.verticalDirection = this.verticalDirection * -1
                if (checkWall(this)) {
                    destroyPlayer(this);
                    return;
                }
            }
        } else {
            if (Math.random() < 0.0001) {
                this.horizontalDirection = this.horizontalDirection == 0 ? (Math.random() < 0.5 ? -1 : 1) : 0;
                this.verticalDirection = this.verticalDirection == 0 ? (Math.random() < 0.5 ? -1 : 1) : 0;
            }
        }

        MovePlayer(this);
    }

    function trackBehaviour() {
        if (isDeath(this)) {
            return;
        }

        players.forEach(player => {

        });

        MovePlayer(this);

    }

    function goAwayBeaviour() {
        if (isDeath(this)) {
            return;
        }
        players.forEach(player => {

        });
        MovePlayer(this);

    };

    let allBeahaviours = [randomBehaviour, trackBehaviour, goAwayBeaviour];


    return {
        randomBehaviour: randomBehaviour,
        trackBehaviour: trackBehaviour,
        goAwayBeaviour: goAwayBeaviour,
        allBeahaviours: allBeahaviours,
        destroy: destroyPlayer
    }

})(players);









function init() {
    ctx.strokeStyle = "#ffffff";
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.stroke();
    for (let index = 0; index < COLORS.length; index++) {

        let player = {
            actualX: Math.trunc(((canvas.width - 2) / (COLORS.length + 1)) * (1 + index)),
            actualY: START_Y,
            horizontalDirection: 0,
            verticalDirection: -1,
            color: COLORS[index],
            points: [],
            behaviour: behaviours.randomBehaviour

        }

        players.push(player);

    }

}


function drawPlayer(player) {
    drawPoint(player.actualX, player.actualY, player.color);
}

function drawPoint(x, y, color) {
    ctx.beginPath();
    ctx.rect(x, y, 1, 1);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}



function draw() {

    players.forEach(player => {
        player.behaviour();
        drawPlayer(player);
    });

}

init();

setInterval(draw, 5);



