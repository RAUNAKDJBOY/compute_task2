import { useState } from 'react'
import './App.css'

function App() {
  let [todolist, settodolist] = useState([]);

  let savetodolist = (event) => {
    event.preventDefault();

    let todo = event.target.todo.value.trim();

    if (todo === "") return;

    if (!todolist.includes(todo)) {
      settodolist([...todolist, todo]);
    } else {
      alert("Todo already exists");
      return;
    }

    event.target.todo.value = "";
  };

  let list = todolist.map((value, index) => {
    return (
      <ToDoListItems
        value={value}
        key={index}
        indexnumber={index}
        todolist={todolist}
        settodolist={settodolist}
      />
    );
  });

  return (
    <div className="App">
      <h1>ToDo list</h1>

      <form onSubmit={savetodolist}>
        <input type="text" name="todo" />
        <button>Save</button>
      </form>

      <div className="outerDiv">
        <ul>
          {list}
        </ul>
      </div>
    </div>
  );
}

export default App;


function ToDoListItems({ value, indexnumber, todolist, settodolist }) {

  let deleterow = () => {
    let finaldata = todolist.filter((v, i) => i !== indexnumber);
    settodolist(finaldata);
  };

  return (
    <li>
      {indexnumber + 1}. {value}
      <span onClick={deleterow}>
        &times;
      </span>
    </li>
  );
}

