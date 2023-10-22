import React, { useState, useEffect } from 'react';
import './TickerTape.css';

const TickerTape = ({ hacks }) => {
    const [hackIndex, setHackIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setHackIndex(prevIndex => (prevIndex + 1) % hacks.length);
        }, 2000); // Change sticker every 2 seconds

        return () => clearInterval(interval);
    }, [hacks]);

    return (
        <div className="sticker-tape-container">
            {hacks.map((hack, index) => (
                <div key={index} className={`sticker ${index === hackIndex ? 'active' : ''}`}>
                    {hack.hackName} - Total Investment: {hack.totalCapital}
                </div>
            ))}
        </div>
    );
};

export default TickerTape;
