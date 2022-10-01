import React from 'react';
import './App.css';
import GameArea from "./components/GameArea/GameArea";

function App() {
  return (
    <div className="App">
        <h2>
            HTML/CSS/Javascript React game demonstration
        </h2>
        <h5>
            Move with WASD
        </h5>
        <div className="game-container">
            <GameArea/>
        </div>
        <h5>
            No canvas element used <br/>
            Referenced resources and techniques by Javascript game dev Drew Conley <br/>
        </h5>
    </div>
  );
}

export default App;
