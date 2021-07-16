import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './app.css';
import { Grid } from './components/Grid/Grid';
import { Noise} from "./components/Noises/Noise";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        {/* <Noise audioCtx={audioCtx} type={"brown"}/> */}
        <Grid />
      </div>
    </DndProvider>
  );
}

export default App;
