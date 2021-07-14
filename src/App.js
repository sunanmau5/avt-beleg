import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Container } from './components/Grid/Container';
import './app.css'


function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="wrapper">
        <Container></Container>
      </div>
    </DndProvider>
  );
}

export default App;
