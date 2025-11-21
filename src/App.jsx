

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import TardisIntro from './components/TardisIntro'; 
import TardisInterior from './components/TardisInterior'; 
import './App.css'; 

function App() {
  const [showInterior, setShowInterior] = useState(false);

  const handleEnter = () => {
    
    setTimeout(() => {
      setShowInterior(true); 
    }, 1500); 
  };
  
 
  const handleExit = () => {
      setShowInterior(false);
  };

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {!showInterior ? (
          <TardisIntro key="tardis" onEnter={handleEnter} />
        ) : (
          
          <TardisInterior key="interior" onExit={handleExit} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;