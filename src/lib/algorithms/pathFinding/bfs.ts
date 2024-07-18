import { getUntraversedNeighbours } from "../../../utils/getUntraversedNeighbours";
import { isEqual } from "../../../utils/helpers";
import { GridType, TileType } from "../../../utils/types";

export const bfs = (grid:GridType,startTile:TileType,endTile:TileType)=>{
    const traversedTiles:TileType[] = [];
    const base = grid[startTile.row][startTile.col];
    base.distance = 0;
    base.isTraversed = true;
    const unTraversed = [base];
    while(unTraversed.length){
        /** unTraversed.shift():The shift method removes the first element from an array and returns that element. 
         * The ! after unTraversed.shift() is a non-null assertion operator. 
         * This tells TypeScript that even though shift can technically return undefined (if the array is empty), 
         * you are asserting that it will not be undefined at this point.
        */
        const tile = unTraversed.shift()!; 
        if(tile.isWall) continue;
        if(tile.distance === Infinity) break;
        tile.isTraversed = true;
        traversedTiles.push(tile);
        if(isEqual(tile,endTile)) break;
        //finding the untraversed neighbours of the tile
        const neighbour = getUntraversedNeighbours(grid,tile);
        for(let i=0;i<neighbour.length;i++){
             
        }

        

    }
}