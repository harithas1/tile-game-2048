const container = document.getElementById("container")
const GRID_SIZE = 4
container.style.setProperty("--grid-size",GRID_SIZE)
const score = document.getElementById("score")

const CELLS = []

function createBoard(){
   for(let i = 0; i < GRID_SIZE * GRID_SIZE; i++){
    const cell = document.createElement("div")
    cell.classList.add("cell")
    container.appendChild(cell)
    CELLS.push({
        tile: null,
        element: cell
    })
    } 
    createNewTile()
    // createNewTile()
}






function getRandomEmptyCells(){
    const emptyCells = CELLS.filter(cell => cell.tile === null)
     
    if(emptyCells.length === 0) return null
    let randomIndex = Math.floor(Math.random()*emptyCells.length)
    return emptyCells[randomIndex]    
}



function createNewTile(){
    const emptyCell = getRandomEmptyCells()

    
    if(emptyCell === null) return;

    const tile = document.createElement("div")
    tile.classList.add("tile")
    tile.textContent = Math.random() < 0.5 ? 4 : 2;    
    tile.id = `t${tile.textContent}`
    emptyCell.tile = tile
    console.log(emptyCell);

    container.appendChild(tile);

    // console.log("tile",tile);


    setTIlePosition(tile, emptyCell)
}



function setTIlePosition(tile, emptyCell){
    const cellIndex = CELLS.indexOf(emptyCell)
   
    
    const row = Math.floor(cellIndex/GRID_SIZE)
    const col = cellIndex % GRID_SIZE

    // console.log(col, row);

    tile.style.setProperty("--x",col)
    tile.style.setProperty("--y", row)

}


window.addEventListener("keydown", keyPress)


function keyPress(event){
    switch(event.key){
        case "ArrowUp":
            if(move("up")) createNewTile()
            break
        case "ArrowDown":
            if(move("down")) createNewTile()
            break
        case "ArrowLeft":
            if(move("left")) createNewTile()
            break
        case "ArrowRight":
            if(move("right")) createNewTile()
            break
    }
    // checkGAmeOver()

}


function move(direction){
    let moved = false;
    for(let i = 0; i < GRID_SIZE; i++){
        let tiles;
        switch(direction){
            case "up":
                tiles = getColumn(i)
                break;
            case "down":
                tiles = getColumn(i).reverse()
                break;
            case "left":
                tiles = getRow(i)
                break;
            case "right":
                tiles = getRow(i).reverse()
                break;                                   
        }
        const newTiles = slide(tiles)
        moved = moved || newTiles.some((tile, index) => tile !== tiles[index])

        switch(direction){
            case "up":
                setColumn(i, newTiles)
                break
            case "down":
                setColumn(i, newTiles.reverse())
                break
            case "left":
                setRow(i, newTiles)
                break
            case "right":
                setRow(i, newTiles.reverse())
                break
        }
    }
    updateTilePositions()
    return moved
    
}


function updateTilePositions(){
    CELLS.forEach(cell => {
        if(cell.tile != null){
            setTIlePosition(cell.tile, cell)
        }
    })
}


let scores = 0;
function updateScores(points){
    scores+=Number(points)
    score.textContent = scores

}



function getColumn(col){
    return [
        CELLS[col].tile,
        CELLS[col+GRID_SIZE].tile,
        CELLS[col+2*GRID_SIZE].tile,
        CELLS[col+3*GRID_SIZE].tile
    ]
}

// console.log(getColumn(0));

function setColumn(col, newCol){
    for(let i = 0; i < GRID_SIZE; i++){ 
        CELLS[col + i * GRID_SIZE].tile = newCol[i]
    }
}



function getRow(row){
    return [
        CELLS[row * GRID_SIZE + 0].tile,
        CELLS[row * GRID_SIZE + 1].tile,
        CELLS[row * GRID_SIZE + 2].tile,
        CELLS[row * GRID_SIZE + 3].tile
    ]
}

function setRow(row, newRow){
    for(let i = 0; i < GRID_SIZE; i++){
        CELLS[row* GRID_SIZE + i].tile = newRow[i]
    }
}



function slide(tiles){
    let filteredTiles = tiles.filter(tile => tile != null)
    const newTiles = []
    let i = 0;
    while(i<filteredTiles.length){
        if(i + 1 < filteredTiles.length && filteredTiles[i].textContent === filteredTiles[i+1].textContent){
            filteredTiles[i].textContent = parseInt(filteredTiles[i].textContent)*2;
            filteredTiles[i].id = `t${filteredTiles[i].textContent}`
            filteredTiles[i+1].remove()
            filteredTiles[i+1] = null;
            updateScores(filteredTiles[i].textContent)

            
            newTiles.push(filteredTiles[i])
            i+=2
        }else{
            newTiles.push(filteredTiles[i]);
            i++;
        }
    }
    return newTiles.concat(new Array(GRID_SIZE - newTiles.length).fill(null))

}


createBoard()










console.log(CELLS);





