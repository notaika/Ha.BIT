import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Clock.scss';

const Clock = () => {
    const [time, setTime] = useState(new Date());
    const [quote, setQuote] = useState([])

    useEffect(() => {
        const tick = () => {
            setTime(new Date());
        };
        const timerID = setInterval(tick, 1000);
        return () => {
            clearInterval(timerID);
        };
    }, []);

    const formatTime = (date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    const getGameQuote = async () => {
        try {
            const response = await axios.get('https://cors-anywhere.herokuapp.com/https://ultima.rest/api/random');
            setQuote(response.data)
            console.log(quote)
        } catch (error) {
            console.log(`ERROR: Could not fetch quote`, error);
        }
    }

    useEffect(() => {getGameQuote();}, [])

    return (
        <div className="clock">
            <h2 className="clock__time">{formatTime(time)}</h2>
            <div className="clock__quote">
                <p className="clock__quote-text">{quote.quote}</p>
                <p className="clock__quote-game">-{quote.title}</p>
            </div>
        </div>
    );
};

export default Clock;
