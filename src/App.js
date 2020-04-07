import React, { useState } from 'react';
import { Gallery } from './components';
import logo from './logo.svg';
import './App.css';

function App() {
  const [showGallery, setShowGallery] = useState(false);

  return (
    <div className="App">
      {showGallery ? <Gallery closeGallery={setShowGallery}></Gallery> :
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <span
            className="App-link"
            onClick={() => { setShowGallery(true) }}
          >
            Show Gallery
        </span>
        </header>
      }
    </div>
  );
}

export default App;
