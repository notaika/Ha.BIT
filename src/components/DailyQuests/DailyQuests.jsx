import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import quillIcon from "../../assets/images/quill.png";
import scrollIcon from "../../assets/images/scroll.png";
import "./DailyQuests.scss";

export default function DailyQuests({ token }) {
  const date = new Date().toISOString().split("T")[0];
  const [habits, setHabits] = useState([]);
  const [habitInput, setHabitInput] = useState("");

  // Need to do:
  // - Delete HABIT API call
  // - Button that changes the state of habit from false to true in HABIT Database

  const getHabits = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/api/habits`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setHabits(response.data);
    } catch (error) {
      console.log(`ERROR: Could not retrieve habits`, error);
    }
  };

  useEffect(() => {
    if (token) {
      getHabits();
    }
  }, [token]);

  const handleChange = (e) => {
    e.preventDefault();
    setHabitInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postHabit(habitInput);
  }

  const postHabit = async (habit) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_LOCALHOST}/api/habits`, 
        { 
            habit: habit
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setHabits([...habits, response.data]);
        setHabitInput('');
    } catch (error) {
        console.log(`ERROR: Unable to post comment`, error)
    }
  }

  const deleteHabit = async (habitId) => {
    try {
        await axios.delete(`${import.meta.env.VITE_LOCALHOST}/api/habits/${habitId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setHabits(habits.filter(habit => habit.id !== habitId))
    } catch (error) {
        console.log(`ERROR: Habit was not deleted`, error)
    }
  }

  const markCompleted = async (habitId) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_LOCALHOST}/api/habits/completed`, {
            habits_id: habitId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(`SUCCESS: Habit marked as completed`, response.data)
    } catch (error) {
        console.log(`ERROR: Could not mark habit as completed`, error)
    }
  }

  return (
    <section className="dailies">
      <div className="dailies__top">
        <h3 className="dailies__date">Today's Date: {date}</h3>
      </div>
      <div className="dailies__habits">
        {habits.map((habit) => (
          <div className="dailies__habits-item">
            <p className="dailies__habits-habit">{habit.habit}</p>
            <div className="dailies__habits-actions">
                <button className="dailies__habits-actions-complete" onClick={() => markCompleted(habit.id)}>Mark as completed</button>
                <button className="dailies__habits-actions-track">Track Habit</button>
                <button className="dailies__habits-actions-delete" onClick={() => deleteHabit(habit.id)}>x</button>
            </div>
          </div>
          
        ))}
        
      </div>


      <form className="dailies__form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add a new habit..."
            className="dailies__form-habit"
            value={habitInput}
            onChange={handleChange}
          />
          <button className="dailies__form-submit">
            <img
              src={quillIcon}
              alt="A quill icon to add a task"
              className="dailies__form-submit-icon"
            />
          </button>
        </form>
    </section>
  );
}
