import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import quillIcon from "../../assets/images/quill.png";
import scrollIcon from "../../assets/images/scroll.png"
import "./SideQuests.scss";

export default function SideQuests({ user, token }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const getTasks = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_LOCALHOST}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setTasks(response.data);
    } catch (error) {
      console.error(`ERROR: Could not get tasks`, error);
    }
  };

  useEffect(() => {
    if (token) {
      getTasks();
    }
  }, [token]);

  const addTask = async () => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_LOCALHOST}/api/tasks`, {
                user_id: user.id,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask();
  }

  const deleteTask = async (id) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_LOCALHOST}/api/tasks/${id}`);
        setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
        console.log(`ERROR: Could not delete task`, error)
    }
  }

  const handleDeleteTask = (id) => {
    deleteTask(id);
  }

  const toggleComplete = async (id, isCompleted) => {
    try {
      await axios.patch(`${import.meta.env.VITE_LOCALHOST}/api/tasks/${id}`, {
        isCompleted: !isCompleted
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setTasks(tasks.map(task => {
        if (task.id === id) {
            return {...task, isCompleted: !task.isCompleted};
        }
        return task;
      }));
    } catch (error) {
      console.log(`ERROR: Could not update task status`, error);
    }
  }

  return (
    <div className="tasks">
      <h1 className="tasks__title">Side Quests <img src={scrollIcon} alt="" className="tasks__title-icon" /></h1>
      <form onSubmit={handleSubmit} className="tasks__checklist">
        {tasks.map((task) => (
          <div className="tasks__item" key={task.id}>
            <div className="tasks__item-content">
                <input 
                  type="checkbox" 
                  className="tasks__task" 
                  id={task.id} 
                  checked={task.isCompleted}
                  onChange={() => toggleComplete(task.id, task.isCompleted)}
                />
                <label htmlFor={task.id} className={`tasks__task-label ${task.isCompleted ? 'tasks__task-label-completed' : ''}`}>
                  {task.task}
                </label>
            </div>
                <span className="tasks__item-x" onClick={() => handleDeleteTask(task.id)}>x</span>
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
