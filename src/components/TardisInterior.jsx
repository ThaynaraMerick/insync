import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import Countdown from './Countdown'; 
import tardisMusic from '../assets/audio/tardis-music.mp3'; 
import './TardisInterior.css'; 


import pic1 from '../assets/photos/pic1.jpg';
import pic2 from '../assets/photos/pic2.jpg';
import pic3 from '../assets/photos/pic3.jpg';



const letterSections = [
    {
        korean: "여기에 당신의 글을 넣어주세요.",
        portuguese: "Seu texto aqui.",
    }
];


const enterVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
            duration: 1.5,
            delay: 0.5,
            ease: "easeOut"
        }
    },
};


const letterSlideVariants = {
    enter: (direction) => ({ 
        x: direction > 0 ? 100 : -100,
        opacity: 0,
    }),
    center: { 
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30
        }
    },
    exit: (direction) => ({ 
        x: direction < 0 ? 100 : -100,
        opacity: 0,
        transition: {
            duration: 0.3
        }
    })
};

const getRotation = () => (Math.random() - 0.5) * 10;


const photos = [
    { id: 1, src: pic1, caption: 'me' },
    { id: 2, src: pic2, caption: 'me' },
    { id: 3, src: pic3, caption: 'me again' },
];

const TardisInterior = ({ onExit }) => { 
    
    const audioRef = useRef(null); 
    
    
    const [isPlaying, setIsPlaying] = useState(false); 
    
    const [page, setPage] = useState(0); 
    const [direction, setDirection] = useState(0); 
    const [isTranslated, setIsTranslated] = useState(false); 

    
    const startDate = new Date('2024-11-14T00:00:00+09:00'); 

    
    useEffect(() => {
        const audio = new Audio(tardisMusic);
        audio.loop = true;
        audio.volume = 0.6;
        
        
        audioRef.current = audio;

       
        audio.play()
            .then(() => setIsPlaying(true))
            .catch(error => {
                console.warn("Música bloqueada ou erro na reprodução:", error);
                setIsPlaying(false);
            });

        return () => {
            
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, []); 

    
    const nextPage = () => {
        if (page < letterSections.length - 1) {
            setDirection(1); 
            setPage(page + 1);
        }
    };

    const prevPage = () => {
        if (page > 0) {
            setDirection(-1); 
            setPage(page - 1);
        }
    };

    
    const toggleTranslation = () => {
        setIsTranslated(prev => !prev);
    };
    
    
    const toggleMusic = () => {
        
        const audio = audioRef.current;
        if (!audio) return; 

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play()
                .then(() => setIsPlaying(true))
                .catch(error => console.error("Erro ao tentar tocar a música:", error));
        }
    };
    
    
    const handleGoBack = () => {
        
        const audio = audioRef.current;
        if (audio && isPlaying) {
            audio.pause();
        }
        onExit(); 
    };

    
    const currentText = isTranslated 
        ? letterSections[page].portuguese 
        : letterSections[page].korean;

    return (
        
        <motion.div
            className="interior-scene-container"
            variants={enterVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="console-background">
                
              
                <motion.button
                    className="back-button"
                    onClick={handleGoBack}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    🚪 홈으로 돌아가기
                </motion.button>
                
                <h2 className="interior-title">Seu título 💖</h2>
                
                
                <motion.button 
                   className="music-toggle-button"
                   onClick={toggleMusic}
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                >
                    {isPlaying ? '⏸️ 일시 정지 (Pausar)' : '▶️ 재생 (Tocar)'}
                </motion.button>

                <div className="content-area">
                    
                    <div className="photo-strip">
                        {photos.map(photo => (
                            <motion.img 
                                key={photo.id} 
                                
                                src={photo.src} 
                                alt={photo.caption} 
                                className="purikura-frame"
                                initial={{ rotate: getRotation() }} 
                                whileHover={{ scale: 1.1, rotate: 0, zIndex: 10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            />
                        ))}
                        <motion.p 
                            className="purikura-sticker"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 2, duration: 1 }}
                        >
                            ✨ 나만의 사진들 ✨ 
                        </motion.p>
                    </div>

                    
                    <div className="korean-letter-hologram">
                      
                        <AnimatePresence mode="wait" initial={false} custom={direction}>
                            <motion.p
                                key={page + (isTranslated ? 'pt' : 'ko')}
                                className={`korean-text ${isTranslated ? 'portuguese-text' : ''}`}
                                variants={letterSlideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                custom={direction} 
                            >
                                {currentText} 
                            </motion.p>
                        </AnimatePresence>

                        
                        <div className="letter-controls">
                            <motion.button
                                onClick={prevPage}
                                disabled={page === 0}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="nav-button"
                            >
                                ⬅️ 이전 (Anterior)
                            </motion.button>

                            <span className="page-indicator">
                                {page + 1} / {letterSections.length}
                            </span>
                            
                            <motion.button
                                onClick={nextPage}
                                disabled={page === letterSections.length - 1}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="nav-button"
                            >
                                {page === letterSections.length - 1 ? '💌 끝 (Fim)' : '다음 (Próxima) ➡️'}
                            </motion.button>
                        </div>
                        
                       
                        <motion.button 
                           className="translation-button"
                           onClick={toggleTranslation}
                           whileHover={{ scale: 1.05 }}
                        >
                            {isTranslated ? '한글 보기 (Ver Coreano)' : '번역 보기 (Ver Tradução)'}
                        </motion.button>
                    </div>
                </div>

                
                <Countdown startDate={startDate} />
            </div>
        </motion.div>
    );
};

export default TardisInterior;