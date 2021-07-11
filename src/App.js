import React from 'react';
import { Container } from './components/MultipleTargets/Container';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'


function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Container></Container>
      </div>
    </DndProvider>
  );
}

export default App;
