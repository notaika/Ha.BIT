import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LevelTimer from "../../components/LevelTimer/LevelTimer";
import GameWindow from "../../components/GameWindow/GameWindow";
import SideQuests from "../../components/SideQuests/SideQuests";
import FinishModal from "../../components/FinishModal/FinishModal";
import "./Dashboard.scss";

export default function Dashboard() {
  const [user, setUser] = useState([]);
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [isCounting, setIsCounting] = useState(false);
  const [initialTime, setInitialTime] = useState(0);
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  let reputation = (user.reputation / 60);

  const getUser = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_LOCALHOST}/api/users/1`);
      setUser(response.data);
    } catch (error) {
      console.log(`ERROR: Could not get user`, error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const getLevels = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_LOCALHOST}/api/levels`);
      setLevels(response.data);
    } catch (error) {
      console.log(`ERROR: Could not get levels`, error);
    }
  };

  useEffect(() => {
    getLevels();
  }, []);

  const cancelTimer = () => {
    setIsCounting(false);
    setSelectedLevel(null);
  }

  const handleLevelSelect = (level) => {
    if (!isCounting) {
      setInitialTime(level.time);
      setSelectedLevel(level);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    cancelTimer();
    if (selectedLevel && selectedLevel.coins) {
      addCoins(selectedLevel.coins);
    };
    if (selectedLevel && selectedLevel.time) {
      addReputation(selectedLevel.time);
    };
      
  };

  const handleTimerFinish = () => {
    handleOpen();
  };
  
  const addCoins = async (addedCoins) => {
    const response = await axios.patch(`${import.meta.env.VITE_LOCALHOST}/api/users/1/coins`, {
      id: 1,
      addedCoins: addedCoins
    })
    setUser((currUser) => ({
      ...currUser, coins: response.data.coins
    }))
  }

  const addReputation = async (addedReputation) => {
    const response = await axios.patch(`${import.meta.env.VITE_LOCALHOST}/api/users/1/reputation`, {
      id: 1,
      addedReputation: addedReputation
    })
    setUser((currUser) => ({
      ...currUser, reputation: response.data.reputation
    }))
  }

  return (
    <main className="dashboard">
      <article className="dashboard__center">
        <div className="dashboard__row">
          <div className="dashboard__row-top--left">
            <button onClick={handleOpen}>Open Finish Modal</button>
            <FinishModal open={open} handleClose={handleClose} selectedLevel={selectedLevel} cancelTimer={cancelTimer} addCoins={addCoins}/>
          </div>
          <div className="dashboard__row-top--right">
            <div className="dashboard__row-player">
              <div className="dashboard__row-player--left">
                <p className="dashboard__row-player-name">Welcome, {user.username}</p>
                <p className="dashboard__row-player-status">CURRENTLY: {selectedLevel ? 'Deployed' : 'Idle'}</p>
                <p className="dashboard__row-player-location">LOCATION: {selectedLevel ? selectedLevel.name : 'At the tavern'}</p>
                <p className="dashboard__row-player-reputation">REPUTATION: {(reputation).toFixed(2)} hours {user.coins}</p>
              </div>
              <div className="dashboard__row-player--right">
                <p className="dashboard__row-player-level">Select an expedition:</p>
                <div className="dashboard__row-player-select">
                  {levels.map((level) => (
                    <button key={level.level} className="level__select-btn" onClick={() => handleLevelSelect(level)}>
                      Level {level.level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="dashboard__row-timer">
              {selectedLevel && (
                <LevelTimer
                  initialTime={initialTime}
                  isCounting={isCounting}
                  onFinish={handleTimerFinish}
                  setSelectedLevel={setSelectedLevel}
                  setIsCounting={setIsCounting}
                  cancelTimer={cancelTimer}
                />
              )}
            </div>
          </div>
        </div>

        <div className="dashboard__row">
          <div className="dashboard__row-quest--left">
            <div className="dashboard__row-quest--container">
              <SideQuests />
            </div>
          </div>
          <div className="dashboard__row-quest--right">
            <div className="dashboard__row-quest--container">
              <p className="dashboard__row-quest--title">Daily Quests</p>
              <ul className="dashboard__dailyquest-list">
                <li className="dashboard__dailyquest-item">Item</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="dashboard__row"></div>
        <div className="dashboard__row"></div>
      </article>
    </main>
  );
}
