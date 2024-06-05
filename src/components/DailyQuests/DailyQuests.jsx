import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './DailyQuests.scss';

export default function DailyQuests() {
    const date = new Date().toISOString().split('T')[0];
    const [habits, setHabits] = useState([]);
    // Need to do:
    // - Delete HABIT API call
    // - Add HABIT API call
    // - Button that changes the state of habit from false to true in HABIT Database

    const getHabits = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_LOCALHOST}/api/habits`)
            setHabits(response.data)
        } catch (error) {
            console.log(`ERROR: Could not retrieve habits`, error)
        }
    }

    useEffect (() => {getHabits();}, [])
    
  return (
    <section className="dailies">
        <div className="dailies__date">
            <h3 className="dailies__date-text">Today's Date: {date}</h3>
        </div>
        <div className="dailies__habits">
            {habits.map((habit) => (
                <div className="dailies__habits-item">
                    <p className="dailies__habits-habit">{habit.habit}</p>
                </div>
            ))}
            
            <form className="dailies__form">
                <input type="text" placeholder="Add a new habit..." className="dailies__form-habit" />
            </form>
        </div>
    </section>
  )
}
