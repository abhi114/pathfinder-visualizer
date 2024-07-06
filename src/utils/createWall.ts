import { MAX_COLS, MAX_ROWS, SPEEDS, WALL_TILE_STYLE } from "./constants";
import { isRowColEqual } from "./helpers";
import { SpeedType, TileType } from "./types";

export const createWall = (
    startTile:TileType,
    endTile:TileType,
    speed:SpeedType,
//The ! operator (non-null assertion operator in TypeScript) asserts that the result of find is not null or undefined.
// This tells TypeScript to treat the result as if it is definitely not null or undefined.
//.value accesses the value property of the object returned by find.
)=>{
    const delay = 6*SPEEDS.find((s)=>s.value === speed)!.value -1;

    for(let row =0;row<MAX_ROWS;row++){
        setTimeout(() => {
            for(let col=0;col<MAX_COLS;col++){
                if(row%2===0 || col%2===0){
                    if(!isRowColEqual(row,col,startTile) && !isRowColEqual(row,col,endTile)){
                        setTimeout(() => {
                            document.getElementById(`${row}-${col}`)!.className = `${WALL_TILE_STYLE} animate-wall`
                        }, delay *col);
                    }
                }
            }
        }, delay*(MAX_ROWS/2)*row);
    }
}