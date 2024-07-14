import { SPEEDS, WALL_TILE_STYLE } from "../../../utils/constants";
import { getRandInt, isEqual, sleep } from "../../../utils/helpers";
import { GridType, SpeedType, TileType } from "../../../utils/types";
import recursiveDivision from "./recursiveDivsion";
/*The recursive division algorithm for maze generation works by recursively dividing the grid into smaller sections and adding walls with passages to create a maze. Here's a breakdown of the logic behind it:

Base Case Check: The function first checks if the height or width of the current grid section is less than or equal to 1. If it is, the function returns as no further division is possible or needed.

Division Decision: The algorithm decides whether to divide the grid section horizontally or vertically. In this case, if the height is greater than the width, it chooses to divide horizontally.

Horizontal Division: When dividing horizontally:

A random row is selected to place a horizontal wall (makeWallAt). This row is chosen such that it's an odd index to ensure the wall is between two rows of the grid.
A random column is selected to create a passage through the wall (makePassageAt). This column is chosen such that it's an even index to ensure the passage aligns with the grid.
Creating the Wall and Passage:

A loop iterates over the columns of the selected row (makeWallAt), setting tiles as walls, except for the makePassageAt column which remains a passage.
Wall tiles are visually updated with a specific style and an animation.
Recursive Calls: After creating the horizontal wall with a passage, the function makes two recursive calls to divide the grid further:

The top section of the grid (from the starting row to the row of the wall).
The bottom section of the grid (from the row after the wall to the end row).
By continuously dividing the grid and adding walls with passages, the algorithm generates a complex maze pattern. Each recursive call further subdivides the grid, ensuring the maze covers the entire grid area.

**/
export async function horizontalDivison({
    grid,
    startTile,
    endTile,
    row,
    col,
    height,
    width,
    setIsDisabled,
    speed}:{
        grid:GridType,
        startTile:TileType,
        endTile:TileType,
        row:number,
        col:number,
        height:number,
        width:number,
        setIsDisabled:(isDisabled:boolean)=> void;
        speed:SpeedType
    }) {
        const makeWallAt = row + getRandInt(0,height-1) * 2+ 1;
        const makePassageAt = col + getRandInt(0,width) * 2;

        for(let i =0;i<2*width-1;i++){
            if(makePassageAt !== col + i){
                if(!isEqual(grid[makeWallAt][col+i],startTile) && !isEqual(grid[makeWallAt][col+i],endTile)){
                    grid[makeWallAt][col+i].isWall = true;
                    document.getElementById(`${makeWallAt}-${col+i}`)!.className = `${WALL_TILE_STYLE} animate-wall`
                    await sleep(10*SPEEDS.find((s)=>s.value === speed)!.value -5)
                }
            }
        }
        await recursiveDivision({grid,startTile,endTile,row,col,height:(makeWallAt -row +1) /2,width,setIsDisabled,speed})
        await recursiveDivision({grid,startTile,endTile,row:makeWallAt+1,col,height:height- (makeWallAt -row +1) /2,width,setIsDisabled,speed})
}       