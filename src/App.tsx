import { useRef } from "react"
import { Grid } from "./components/Grid"
import { PathfindingProvider } from "./context/PathfindingContext"
import { SpeedProvider } from "./context/SpeedContext"
import { TileProvider } from "./context/TileContext"


function App() {
  const isVisualizationRunngingRef = useRef(false);

  return (
    <PathfindingProvider>
      <TileProvider>
        <SpeedProvider>
    <div className="h-screen w-screen flex flex-col">
      <Grid isVisualizationRunngingRef={isVisualizationRunngingRef}/>
    </div>
    </SpeedProvider>
    </TileProvider>
    </PathfindingProvider>
  )
}

export default App
