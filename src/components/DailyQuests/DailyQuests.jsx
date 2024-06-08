import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import quillIcon from "../../assets/images/quill.png";
import scrollIcon from "../../assets/images/scroll.png";
import TrackHabitModal from "../TrackHabitModal/TrackHabitModal";
import "./DailyQuests.scss";

export default function DailyQuests({ token, user }) {
  const date = new Date().toISOString().split("T")[0];
  const [habits, setHabits] = useState([]);
  const [habitInput, setHabitInput] = useState("");
  const [completed, setCompleted] = useState(false);
  const [openTracker, setOpenTracker] = useState(false);
  const handleClose = () => setOpenTracker(false);
  // Need to do:
  // - Delete HABIT API call - done
  // - Button that changes the state of habit from false to true in HABIT table ??
  // - completed habits table call and reflecting changes on front end

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
        { habit: habit }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const newHabit = response.data;
      setHabits([...habits, newHabit]);
      setHabitInput('');
  
      // Pixela integration
      if (import.meta.env.VITE_PIXELA_TOKEN && import.meta.env.VITE_PIXELA_USERNAME) {
        const graphData = {
            id: `habitwebapp-${newHabit.id}`,
            name: `${user.username} - ${newHabit.habit}`,
            unit: 'count',
            type: 'int',
            color: 'shibafu'
          };

          console.log('Pixela Graph Data:', graphData)
      
          const responsePixela = await axios.post(
            `https://pixe.la/v1/users/${import.meta.env.VITE_PIXELA_USERNAME}/graphs`,
            graphData,
            { headers: { 'X-USER-TOKEN': import.meta.env.VITE_PIXELA_TOKEN } }
          );
          
          console.log('Pixela Response:', responsePixela.data);
      }
    } catch (error) {
      console.log(`ERROR: Unable to post habit`, error);
    }
  };

  const deleteHabit = async (habitId) => {
    try {
        await axios.delete(`${import.meta.env.VITE_LOCALHOST}/api/habits/${habitId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setHabits(habits.filter(habit => habit.id !== habitId));

        // Pixela integration
        if (import.meta.env.VITE_PIXELA_TOKEN && import.meta.env.VITE_PIXELA_USERNAME) {
            await axios.delete(`https://pixe.la/v1/users/${import.meta.env.VITE_PIXELA_USERNAME}/graphs/habitwebapp-${habitId}`, 
            { headers: { 'X-USER-TOKEN': import.meta.env.VITE_PIXELA_TOKEN } })

            console.log(`Habit graph was successfully deleted`);
        }
    } catch (error) {
        console.log(`ERROR: Habit was not deleted`, error)
    }
  }

  const markCompleted = async (habitId) => {
    try {
        await axios.post(`${import.meta.env.VITE_LOCALHOST}/api/habits/completed`, {
            habits_id: habitId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setCompleted(prevCompleted => ({
            ...prevCompleted,
            [habitId]: true
        }));
        
        if (import.meta.env.VITE_PIXELA_TOKEN && import.meta.env.VITE_PIXELA_USERNAME) {

            const pixelInput = {
                date: new Date().toISOString().split('T')[0].replace(/-/g, ''),
                quantity: "1"
            }

            await axios.post(`https://pixe.la/v1/users/${import.meta.env.VITE_PIXELA_USERNAME}/graphs/habitwebapp-${habitId}`, pixelInput, {
                headers: { 'X-USER-TOKEN': import.meta.env.VITE_PIXELA_TOKEN }
            })
        }

    } catch (error) {
        console.log(`ERROR: Could not mark habit as completed`, error);
    }
  }

  const getCompletedHabitLogs = async () => {
    const today = new Date().toISOString().split('T')[0];

    try {
        const response = await axios.get(`${import.meta.env.VITE_LOCALHOST}/api/habits/completed`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        const completedLogsToday = response.data;
        console.log(today, completedLogsToday);

        const completedStatus = {};
        completedLogsToday.forEach((log) => {
            if (log.created_at.split('T')[0] === today) {
                completedStatus[log.habits_id] = true;
            } 
        });
        
        setCompleted(completedStatus);
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {getCompletedHabitLogs();}, [token])

  const [graphUrl, setGraphUrl] = useState('Habit Tracker URL not found')

  const handleOpenTracker = (habitId) => {
    setOpenTracker(true);
    setGraphUrl(`https://pixe.la/v1/users/${import.meta.env.VITE_PIXELA_USERNAME}/graphs/habitwebapp-${habitId}.html`)
  }

  return (
    <section className="dailies">
    <TrackHabitModal openTracker={openTracker} handleClose={handleClose} graphUrl={graphUrl}/>
      <div className="dailies__top">
        <h3 className="dailies__date">Today's Date: {date}</h3>
      </div>
      <div className="dailies__habits">
        {habits.map((habit) => (
          <div className="dailies__habits-item" key={habit.id}>
            <p className="dailies__habits-habit">{habit.habit}</p>
            <div className="dailies__habits-actions">
                <button
                    className={`dailies__habits-actions-complete ${completed[habit.id] ? 'dailies__habits-actions-complete-true' : ''}`}
                    onClick={() => markCompleted(habit.id)}
                >
                    {completed[habit.id] ? 'Completed' : 'Mark as completed'}
                </button>
                <button className="dailies__habits-actions-track" onClick={() => handleOpenTracker(habit.id)}>Track Habit</button>
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
