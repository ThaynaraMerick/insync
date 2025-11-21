import React, { useState, useEffect } from 'react';
import './Countdown.css';

const Countdown = ({ startDate }) => {
    
    const calculateTimeRemaining = (start) => {
        
        const now = new Date();
        
       
        const difference = now.getTime() - start.getTime();

        
        if (difference < 0) {
            return {
                years: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            };
        }

        const totalSeconds = Math.floor(difference / 1000);
        
       
        const seconds = totalSeconds % 60;
        const totalMinutes = Math.floor(totalSeconds / 60);
        const minutes = totalMinutes % 60;
        const totalHours = Math.floor(totalMinutes / 60);
        const hours = totalHours % 24;
        const totalDays = Math.floor(totalHours / 24);
        
        
        const days = totalDays % 365;
        const years = Math.floor(totalDays / 365); 

        return {
            years,
            days,
            hours,
            minutes,
            seconds
        };
    };

    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(startDate));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining(startDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [startDate]);

    const { years, days, hours, minutes, seconds } = timeRemaining;

    return (
        <div className="time-counter-display">
            <div className="time-unit">
                <span className="time-number">{years}</span>
                <span className="time-label">년</span> 
            </div>
            <div className="time-unit">
                <span className="time-number">{days}</span>
                <span className="time-label">일</span> 
            </div>
            <div className="time-unit">
                <span className="time-number">{hours}</span>
                <span className="time-label">시간</span> 
            </div>
            <div className="time-unit">
                <span className="time-number">{minutes}</span>
                <span className="time-label">분</span> 
            </div>
            <div className="time-unit">
                <span className="time-number">{seconds}</span>
                <span className="time-label">초</span> 
            </div>
        </div>
    );
};

export default Countdown;