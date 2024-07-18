import { twMerge } from "tailwind-merge";
import { usePathfinding } from "../hooks/usePathfinding";
import { MAX_COLS, MAX_ROWS } from "../utils/constants";
import { Tile } from "./Tile";
import { MutableRefObject, useState } from "react";
import { checkIfStartOrEnd, createNewGrid } from "../utils/helpers";

export function Grid({isVisualizationRunngingRef}:{isVisualizationRunngingRef:MutableRefObject<boolean>}) {
const {grid,setGrid} = usePathfinding();  
const [isMouseDown,setIsMouseDown] = useState(false);

const handleMouseDown = (row:number,col:number)=>{
    if(isVisualizationRunngingRef.current || checkIfStartOrEnd(row,col)){
        return;
    }
        setIsMouseDown(true);
        const newGrid = createNewGrid(grid,row,col);
        setGrid(newGrid);
    
}
const handleMouseUp = (row:number,col:number)=>{
    if(isVisualizationRunngingRef.current || checkIfStartOrEnd(row,col)){
        return;
    }
    setIsMouseDown(false);

}

const handleMouseEnter =(row:number, col:number)=>{
    if(isVisualizationRunngingRef.current || checkIfStartOrEnd(row,col)){
        return;
    }
    if(isMouseDown){
        const newGrid = createNewGrid(grid,row,col);
        setGrid(newGrid);
    }
}
return (
    <div className={twMerge(//base classes
        "flex items-center flex-col justify-center border-sky-300 mt-10 pb-10",
        //control grid height
        `lg:min-h-[${MAX_ROWS*17}px] md:min-h-[${MAX_ROWS*15}px] 
        xs:min-h-[${MAX_ROWS*8}px] min-h-[${MAX_ROWS*7}px]`,
        //controlling width
        `lg:w-[${MAX_COLS*17}px] md:w-[${MAX_COLS*15}px] xs:w-[${MAX_COLS*8}px] w-[${MAX_COLS*7}px]`
    )}>
        {grid.map((r,rowindex)=>(
            <div key={rowindex} className="flex">
                {r.map((tile,tileIndex)=>{
                    const {row,col,isStart,isEnd,isPath,isTraversed,isWall} = tile;
                    return(
                        <Tile 
                        key={tileIndex}
                        row={tile.row}
                        col={tile.col}
                        isEnd={isEnd}
                        isStart={isStart}
                        isPath={isPath}
                        isTraversed = {isTraversed}
                        isWall = {isWall}
                        handleMouseDown={()=>handleMouseDown(row,col)}
                        handleMouseUp={()=>handleMouseUp(row,col)}
                        handleMouseEnter={()=>handleMouseEnter(row,col)}
                              />
                    )
                })}
            </div>
        ))}
        <div className="contents">
            <h2 className="capitalize hover:uppercase mt-5">created by - Abhishek Nigam</h2>
        </div>
    </div>
)

}

