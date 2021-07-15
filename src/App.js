import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './app.css';
import { Grid } from './components/Grid/Grid';


function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <Grid />
      </div>
    </DndProvider>
  );
}

export default App;
