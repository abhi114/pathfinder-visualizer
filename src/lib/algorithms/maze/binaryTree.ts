import { MAX_COLS, MAX_ROWS } from "../../../utils/constants";
import { createWall } from "../../../utils/createWall";
import { sleep } from "../../../utils/helpers";
import { GridType, SpeedType, TileType } from "../../../utils/types";

export const binaryTree =async (
    grid:GridType,
    startTile:TileType,
    endTile:TileType,
    setIsDisabled:(isDisabled:boolean)=>void,
    speed:SpeedType
)=>{
    createWall(startTile,endTile,speed)
    await sleep(MAX_ROWS*MAX_COLS);
}