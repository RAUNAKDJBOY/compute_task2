import React, { useState } from 'react';
import './App.css';

// Single Todo Item
const TodoItem = ({ task, toggleComplete, deleteTask }) => {
  return (
    <li className={`item ${task.completed ? 'done' : ''}`}>
      <span className="text" onClick={() => toggleComplete(task.id)}>
        {task.text}
      </span>
      <button className="remove-btn" onClick={() => deleteTask(task.id)}>
        Delete
      </button>
    </li>
  );
};

// List of all todos
const TodoList = ({ tasks, toggleComplete, deleteTask }) => {
  const sortedTasks = [...tasks].sort((a, b) => (a.completed ? 1 : -1));

  return (
    <ul className="list">
      {sortedTasks.length === 0 ? (
        <p className="empty">No tasks yet. Add one above!</p>
      ) : (
        sortedTasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
          />
        ))
      )}
    </ul>
  );
};

// Input form
const TodoForm = ({ addTask }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    if (inputValue.trim()) {
      addTask(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="form">
      <input
        type="text"
        className="input"
        placeholder="Enter a task..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <button className="add-btn" onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
};

// Parent App
const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (text) => {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="wrapper">
      <div className="box">
        <h1 className="title">My To-Do List</h1>
        <TodoForm addTask={addTask} />
        <TodoList
          tasks={tasks}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
};

export default App;

