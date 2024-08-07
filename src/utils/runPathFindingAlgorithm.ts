import { bfs } from "../lib/algorithms/pathFinding/bfs";
import { dfs } from "../lib/algorithms/pathFinding/dfs";
import { dijkstra } from "../lib/algorithms/pathFinding/dijkstra";
import { AlgorithmType, GridType, TileType } from "./types"

export const runPathFindingAlgorithm = ({
    algorithm,
    grid,
    startTile,
    endTile,
}:{algorithm:AlgorithmType;
    grid:GridType;
    startTile:TileType,
    endTile:TileType
}) => {
    switch(algorithm){
        case "BFS":
            return bfs(grid,startTile,endTile);
        case "DFS":
            return dfs(grid,startTile,endTile)
        case "DIJKSTRA":
            return dijkstra(grid,startTile,endTile);
        default:
            return bfs(grid,startTile,endTile);
    }
}