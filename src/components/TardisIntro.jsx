// src/components/TardisIntro.jsx

import React from 'react';
import { motion } from 'framer-motion'; 
import tardisImage from '../assets/photos/tardis.png'; 
import tardisSound from '../assets/audio/tardis-vwoorp.mp3'; 
import './TardisIntro.css'; 




const floatVariants = {
  animate: {
    y: [0, -15, 0], 
    transition: {
      duration: 5,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};


const exitVariants = {
  // ...
  exit: {
    // ...
    transition: {
      duration: 1.5,
      
      ease: [0.6, 0.01, -0.05, 0.9], 
    },
  },
};

const TardisIntro = ({ onEnter }) => {
    
  const handleTardisClick = () => {
    const audio = new Audio(tardisSound);
    audio.play();
    onEnter();
  };

  return (
    <motion.div
      className="tardis-scene-container"
      variants={exitVariants}
      initial="hidden"
      exit="exit"
    >
      <motion.img
        src={tardisImage}
        alt="A TARDIS flutuando no espaço"
        className="tardis-model"
        variants={floatVariants}
        initial="animate" 
        animate="animate"
      />
      
      <h1 className="tardis-title">시간과 공간 속의 1년</h1>
      <p className="tardis-subtitle">
        환영해, 내 사랑. 시간과 상대적 공간 차원의 1년에 온 걸.
      </p>

      <motion.button 
        className="enter-button" 
        onClick={handleTardisClick}
        whileHover={{ scale: 1.05, boxShadow: `0 0 15px var(--tardis-light)` }}
        whileTap={{ scale: 0.95 }}
      >
        들어가기!
      </motion.button>
    </motion.div>
  );
};

export default TardisIntro;