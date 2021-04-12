
const COLOR_IDLE = "#313131";
const COLOR_ACTIVE = "#f32148";
const COLOR_BORDER_LOCKED = "#ffffff";
const COLOR_BORDER_UNLOCKED = "#000000";
const COLOR_BORDER_PLAYED = "#ffffff";

function Tile(originX, originY, width, heigh){
    this.originX = originX;
    this.originY = originY;
    this.width = width;
    this.heigh = heigh;
    this.status = tileStatus.idle;
    this.isPlayed = false;
    this.livingNeighbours=-1;
};

function tileFillColor(){
    switch (this.status) {
        case tileStatus.idle:
            return COLOR_IDLE;
        case tileStatus.idleLock:
            return COLOR_IDLE;
        case tileStatus.active:
            return COLOR_ACTIVE;
        case tileStatus.activeLock:
            return COLOR_ACTIVE;
    }
};

Tile.prototype.tileFillColor = tileFillColor;

function tileBorderColor(){
    if (this.isPlayed) {
        return COLOR_BORDER_PLAYED;
    }
    if (this.status === tileStatus.activeLock || this.status === tileStatus.idleLock) {
        return COLOR_BORDER_LOCKED;
    }
    return COLOR_BORDER_UNLOCKED;
};

Tile.prototype.tileBorderColor = tileBorderColor;

function drawTile(context){
    context.beginPath();
    context.clearRect(this.originX, this.originY, this.width, this.heigh);
    context.rect(this.originX+1, this.originY+1, this.width-2, this.heigh-2);
    context.lineWidth = 2;
    context.fillStyle = this.tileFillColor();
    context.fill();
    context.strokeStyle = this.tileBorderColor();
    context.stroke();
    context.closePath();
};

Tile.prototype.drawTile = drawTile;
    
var tileStatus = {
    idle : 0,
    active : 1,
    activeLock: 2,
    idleLock: 3
};

