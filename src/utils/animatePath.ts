import { SLEEP_TIME, SPEEDS } from "./constants";
import { SpeedType, TileType } from "./types";

export const animatePath = (
    traversedTile:TileType[],
    path:TileType[],
    startTile:TileType,
    endTile:TileType,
    speed:SpeedType
) => {
    for(let i=0;i<traversedTile.length;i++){
        setTimeout(()=>{
             const tile = traversedTile[i];
             
        },SLEEP_TIME * i * SPEEDS.find((s)=>s.value === speed)!.value)
    }
}