import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LevelTimer from "../../components/LevelTimer/LevelTimer";
import GameWindow from "../../components/GameWindow/GameWindow";
import SideQuests from "../../components/SideQuests/SideQuests";
import "./Dashboard.scss";

export default function Dashboard() {
  const [user, setUser] = useState('');
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [isCounting, setIsCounting] = useState(false);
  const [initialTime, setInitialTime] = useState(0);
  const { id } = useParams();

  const getUser = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_LOCALHOST}/api/users/`);
      setUser(response.data[0].username);
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

  const handleLevelSelect = (level) => {
    if (!isCounting) {
      setInitialTime(level.time);
      setSelectedLevel(level);
    }
  };

  const handleTimerFinish = () => {
    // add coins to player wallet from here;
    // add to reputation
  };

  return (
    <main className="dashboard">
      <article className="dashboard__center">
        <div className="dashboard__row">
          <div className="dashboard__row-top--left">
            <GameWindow />
          </div>
          <div className="dashboard__row-top--right">
            <div className="dashboard__row-player">
              <div className="dashboard__row-player--left">
                <p className="dashboard__row-player-name">Welcome, {user}</p>
                <p className="dashboard__row-player-status">CURRENTLY: {selectedLevel ? 'Deployed' : 'Idle'}</p>
                <p className="dashboard__row-player-location">LOCATION: {selectedLevel ? selectedLevel.name : 'At the tavern'}</p>
                <p className="dashboard__row-player-reputation">REPUTATION: 128 hours</p>
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
