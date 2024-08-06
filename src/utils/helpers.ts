import { MAX_COLS, MAX_ROWS } from "./constants";
import { GridType, TileType } from "./types";

const createRow = (row:number,startTile:TileType,endTile:TileType)=>{
    const currentRow = [];
    for(let col=0;col<MAX_COLS;col++){
        currentRow.push({
            row,
            col,
            isEnd:row===endTile.row && col===endTile.col,
            isWall:false,
            isPath:false,
            distance:Infinity,
            isStart:row===startTile.row && col===startTile.col,
            isTraversed:false,
            parent:null
        })
    }
    return currentRow;
}

export const createGrid = (startTile:TileType,endTile:TileType) =>{
    const grid:GridType=[];
    for (let row=0;row<MAX_ROWS;row++){
        grid.push(createRow(row,startTile,endTile));
    }
    return grid

}

export const checkIfStartOrEnd = (row:number ,col:number) => {
    return (row === 1 && col === 1) || (row === MAX_COLS -2 && col === MAX_COLS-2);
}

export const createNewGrid = (grid:GridType,row:number,col:number)=>{
    //dont mutate the grid directly create a copy using slice
    const newGrid = grid.slice();
    //reverse if it was a wall and vice versa
    const newTile = {
        ...newGrid[row][col],
        isWall:!newGrid[row][col].isWall,
    }
    newGrid[row][col] = newTile;
    return newGrid;
}

export const isEqual = (a:TileType ,b:TileType)=>{
    return a.row === b.row && a.col === b.col;
}

export const isRowColEqual = (row:number , col :number,tile:TileType)=>{
    return row === tile.row && col === tile.col;
}

//Function Call: When you call sleep(ms), it creates a new promise.
//Timer: The promise sets a timer using setTimeout, which waits for ms milliseconds before calling the resolve function.
//Resolution: Once the timer expires, setTimeout calls resolve, which resolves the promise.
//Await: If you use await sleep(ms), it pauses the execution of the async function until the promise resolves, effectively causing a delay.
export const sleep = (ms:number) =>{
    return new Promise((resolve)=> setTimeout(resolve,ms))
}

export const getRandInt = (min:number,max:number)=>{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min) + min);
}
export const checkStack = (tile:TileType,stack:TileType[])=>{
    for(let i=0;i<stack.length;i++){
        if(isEqual(stack[i],tile)) return true;
    }
    return false
}