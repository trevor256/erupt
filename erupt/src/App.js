import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';

const socket = io('http://172.31.80.30:3001'); // Your server address

function App() {
  const [players, setPlayers] = useState([]);
  const [position, setPosition] = useState({ x: 200, y: 200 });

  useEffect(() => {
    // Listen for updates from the server
    socket.on('players', (players) => {
      setPlayers(players);
    });

    // Send position to the server on change
    socket.emit('position', position);
  }, [position]);

  const handleMove = (x, y) => {
    setPosition({ x, y });
  };

  return (
    <div className="App">
      {players.map((player, index) => (
        <div
          key={index}
          className="player"
          style={{ top: `${player.y}px`, left: `${player.x}px` }}
        />
      ))}
    </div>
  );
}

export default App;
