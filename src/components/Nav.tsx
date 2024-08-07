import { MutableRefObject, useState } from "react";
import { usePathfinding } from "../hooks/usePathfinding";
import { useTile } from "../hooks/useTile";
import { EXTENDED_SLEEP_TIME, MAZES, pathFindingAlgorithms, SLEEP_TIME, SPEEDS } from "../utils/constants";
import { resetGrid } from "../utils/resetGrid";
import { AlgorithmType, MazeType, SpeedType } from "../utils/types";
import { Select } from "./Select";
import { runMazeAlgorithm } from "../utils/runMazeAlgorithm";
import { useSpeed } from "../hooks/useSpeed";
import { PlayButton } from "./PlayButton";
import { runPathFindingAlgorithm } from "../utils/runPathFindingAlgorithm";
import { animatePath } from "../utils/animatePath";

export function Nav({isVisualizationRunngingRef}:{isVisualizationRunngingRef:MutableRefObject<boolean>}){
    const [isDisabled,setIsDisabled] = useState(false); 
    const {maze,setMaze,grid,setGrid,setIsGraphVisualized,isGraphVisualized,algorithm,setAlgorithm} = usePathfinding();
    const {startTile,endTile} = useTile();
    const {speed,setSpeed} = useSpeed();
    const handleGenerateMaze = (maze:MazeType)=>{
        if(maze==='NONE'){
            setMaze(maze);
            //reset grid
            resetGrid({grid,startTile,endTile});
            return;
        }
        setMaze(maze);
        setIsDisabled(true);    
        //runMazeAlgorith
        runMazeAlgorithm({maze,grid,startTile,endTile,setIsDisabled,speed} )
        //creating a shallow copy of the current grid so that any updates are not on the original grid state
        const newGrid = grid.slice();
        setGrid(newGrid);
        //to give that we have changed the grid and any previous graph visualization is no longer valid
        setIsGraphVisualized(false);
    }
    const handlerRunVisualizer = () =>{
        if(isGraphVisualized){
            setIsGraphVisualized(false);
            resetGrid({grid:grid.slice(),startTile,endTile})
            return
        } 
        // run the algorithm
       const {traversedTiles,path} =  runPathFindingAlgorithm({algorithm,grid,startTile,endTile})
        animatePath(traversedTiles,path,startTile,endTile,speed)
        //to stop people from interacting with the grid
        setIsDisabled(true);
        isVisualizationRunngingRef.current =true;
        setTimeout(() => {
            const newGrid = grid.slice();
            setGrid(newGrid);
            setIsGraphVisualized(true);
            setIsDisabled(false);
            isVisualizationRunngingRef.current = false;
        }, (SLEEP_TIME * (traversedTiles.length + SLEEP_TIME * 2) + EXTENDED_SLEEP_TIME * (path.length + 60) * SPEEDS.find((s)=>s.value === speed)!.value));
    }
    return(
        <div className="flex items-center justify-center min-h-[4.5rem] border-b shadow-gray-600 sm:px-5 px-0">
            <div className="flex items-center lg:justify-between justify-center w-full sm:w-[52rem]">
                <h1 className="lg:flex hidden w-[40%] text-2xl pl-1">
                    Pathfinding Visualizer
                </h1>
                <div className="flex sm:items-end items-center justify-start sm:justify-between sm:flex-row flex-col sm:space-y-0 space-y-3 sm:py-0 py-4 sm:space-x-4">
                    <Select label="Maze"value={maze}
                    options={MAZES}
                    onChange={(e)=>{
                        //handle generating maze
                        handleGenerateMaze(e.target.value as MazeType);
                    }}
                        />
                        <Select label="Graph Select" value={algorithm} 
                        options={pathFindingAlgorithms}
                        onChange={(e)=>{
                            /** Type Assertion (as AlgorithmType): The selected value (e.target.value) is cast to AlgorithmType. 
                             * This type assertion is necessary because e.target.value is of type string, but you want to ensure it 
                             * conforms to the AlgorithmType union type defined in your code. */
                            setAlgorithm(e.target.value as AlgorithmType)
                        }}/>
                        <Select label="Speed" value={speed} options={SPEEDS} isDisabled={isDisabled} onChange={(e)=>{setSpeed(parseInt(e.target.value) as SpeedType)}}/>
                        <PlayButton isDisabled={isDisabled} isGraphVisualized={isGraphVisualized} handlerRunVisualizer={handlerRunVisualizer}/>
                </div>
            </div>
        </div>
    )
}