/** Extensibility: Interfaces can be extended and implemented in classes. Types cannot be implemented in classes but can be intersected.
Declaration Merging: Interfaces can participate in declaration merging (i.e., you can declare the same interface multiple times, 
and TypeScript will merge them), but types do not.
Usage: Use interfaces to describe objects and function shapes, and use types for everything else. */
export type AlgorithmType = "DIJKSTRA" | "A_STAR" | "BFS" | "DFS";
export interface AlgorithmSelectType  {
    name:string;
    value:AlgorithmType; 
}
export type MazeType = "NONE" | "BINARY_TREE" | "RECURSIVE_DIVISION";
export interface MazeSelectType {
    name:string;
    value:MazeType;
}
export type TileType = {
    row:number;
    col:number;
    isEnd:boolean;
    isWall:boolean;
    isPath:boolean;
    distance:number;
    isTraversed:boolean;
    isStart:boolean;
    parent:TileType|null;
}
export type GridType = TileType[][]
export type SpeedType = 2 | 1 | 0.5;
export interface SpeedSelectType {
    name:String;
    value:SpeedType;
    
}
 