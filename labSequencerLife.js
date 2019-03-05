function countLivingNeighbors(matrix, row, column) {
    let rowLimit = matrix.length-1;
    let columnLimit = matrix[0].length-1;
    let count = 0;
    for(let x = Math.max(0, row-1); x <= Math.min(row+1, rowLimit); x++) {
      for(let y = Math.max(0, column-1); y <= Math.min(column+1, columnLimit); y++) {
        if(x !== row || y !== column) {
           let tile = matrix[x][y];
           if (tile.status === tileStatus.active || tile.status === tileStatus.activeLock) {
               count++;
           }
        }
      }
    }
    return count;
  }

function lifeAndDeatLogic(matrix, graphicContext){
    let rowNumber = matrix.length;
    let columnNumber = matrix[0].length;
    for (let i = 0; i < rowNumber; i++) {
        for (let j = 0; j < columnNumber; j++) {
            let tile = matrix[i][j];
            if(tile.status === tileStatus.idle|| tile.status === tileStatus.active){
                let count = countLivingNeighbors(matrix,i,j);
                if ((count < 2 || count > 3)&&tile.status===tileStatus.active) {
                    tile.status = tileStatus.idle;
                    tile.drawTile(graphicContext);
                }else if (count === 3 && tile.status === tileStatus.idle) {
                    tile.status = tileStatus.active;
                    tile.drawTile(graphicContext);
                } 
            }
            
        }
        
    }
}