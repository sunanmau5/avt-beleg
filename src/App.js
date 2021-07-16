import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './app.css';
import { Grid } from './components/Grid/Grid';
import { Noise} from "./components/Noises/Noise";
import { WhiteNoise } from './components/Noises/WhiteNoise';
import { PinkNoise } from './components/Noises/PinkNoise';
import { BrownNoise } from './components/Noises/BrownNoise';

let audioCtx = new AudioContext();

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        {/* <Noise audioCtx={audioCtx} type={"brown"}/> */}
        <WhiteNoise audioCtx={audioCtx} />
        <BrownNoise audioCtx={audioCtx} />
        <PinkNoise audioCtx={audioCtx} />
        <Grid />
      </div>
    </DndProvider>
  );
}

export default App;
