import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]); // State to hold tasks
  const [input, setInput] = useState(''); // State for input field
  const [priority, setPriority] = useState('Medium'); // Task priority
  const [dueDate, setDueDate] = useState(''); // Task due date
  const [dueTime, setDueTime] = useState(''); // Task due time
  const [category, setCategory] = useState('Work'); // Task category
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode toggle

  // Add a new task
  const addTask = () => {
    if (input.trim() === '') return; // Prevent adding empty tasks

    const newTask = {
      id: Date.now(),
      text: input,
      completed: false,
      priority,
      dueDate,
      dueTime,
      category,
    };

    setTasks([...tasks, newTask]);
    setInput(''); // Clear input field
    setPriority('Medium');
    setDueDate('');
    setDueTime('');
    setCategory('Work');
  };

  // Toggle task completion
  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Sort tasks by priority
  const sortTasksByPriority = (a, b) => {
    const priorityOrder = ['Low', 'Medium', 'High'];
    return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
  };

  // Sort tasks by due date and time
  const sortTasksByDueDate = (a, b) => {
    return new Date(a.dueDate + ' ' + a.dueTime) - new Date(b.dueDate + ' ' + b.dueTime);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <h1>To-Do List</h1>
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <input
          type="time"
          value={dueTime}
          onChange={(e) => setDueTime(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Shopping">Shopping</option>
        </select>
        <button onClick={addTask}>Add</button>
      </div>
      <ul className="task-list">
        {tasks
          .sort(sortTasksByPriority)
          .sort(sortTasksByDueDate)
          .map((task) => (
            <li
              key={task.id}
              className={`task ${task.completed ? 'completed' : ''} ${task.priority.toLowerCase()}`}
            >
              <span onClick={() => toggleTaskCompletion(task.id)}>
                {task.text} ({task.category}) - Due: {task.dueDate} {task.dueTime}
              </span>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
