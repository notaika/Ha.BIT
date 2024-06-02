import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import quillIcon from "../../assets/images/quill.png";
import "./SideQuests.scss";

export default function SideQuests() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [userId, setUserId] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);

  const getTasks = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/api/tasks`
      );
      setTasks(response.data);
    } catch (error) {
      console.error(`ERROR: Could not get tasks`, error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addTask = async () => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_LOCALHOST}/api/tasks`, {
                user_id: userId,
                task: newTask,
                isCompleted: isCompleted
        })
        setTasks([...tasks, response.data]);
        setNewTask("")
    } catch (error) {
        console.log(`ERROR: Could not post new task`);
    }
  }

  const handleChange = (e) => {
    e.preventDefault();
    setNewTask(e.target.value)
  };

  const handleSubmit = () => {
    addTask();
  }

  return (
    <div className="tasks">
      <h1 className="tasks__title">Side Quests</h1>
      <form onSubmit={handleSubmit} className="tasks__checklist">
        {tasks.map((task) => (
          <div className="task__item" key={task.id}>
            <input type="checkbox" className="tasks__task" id={task.id} />
            <label htmlFor={task.id} className="tasks__task-label">
              {task.task}
            </label>
          </div>
        ))}

        <div className="tasks__add">
          <input
            type="text"
            onChange={handleChange}
            className="tasks__task-input"
            placeholder="Add a task..."
            id="task"
            value={newTask}
          />
          <button className="tasks__task-submit">
            <img
              src={quillIcon}
              alt="A quill icon to add a task"
              className="tasks__task-icon"
            />
          </button>
        </div>
      </form>
    </div>
  );
}
