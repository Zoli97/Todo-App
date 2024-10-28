import { useState, useEffect } from "react";

import "./App.css";
import Todo from "./components/Todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  //prevent the page from refresh on submit
  //all the current todo attach to new todo.
  //update the todo live
  const createNewTodo = async (e) => {
    e.preventDefault();

    if (content.length > 4) {
      const response = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({ todo: content }),
        headers: { "Content-Type": "application/json" },
      });

      const newTodo = await response.json();
      console.log(newTodo);
      setContent("");
      setTodos([...todos, newTodo]);
    }
  };
  //want to get my todo one time
  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await fetch("/api/todos");
        const todos = await response.json();

        setTodos(todos);
      } catch (err) {
        console.error("Failed to fetch todos:", err);
      }
    };

    getTodos();
  }, []);
  // only show the message if i have a meesage
  //debbuging like arrays of objefcts i can use pre tags
  return (
    //map over every single todo
    <main className="container">
      <h1 className="title">Todo List</h1>

      <form action="" className="form" onSubmit={createNewTodo}>
        <input
          className="form_input"
          type="text"
          name=""
          id=""
          value={content}
          onChange={onChangeContent}
          placeholder="Enter a new todo..."
          required
        />

        <button className="form_btn" type="submit">
          Add item
        </button>
      </form>

      {/* Check if there are todos */}
      <div className="todos">
        {todos.length > 0 &&
          todos.map((_todo) => {
            {
              /* console.log(_todo); // Debug: log each todo item to see its structure */
            }
            return <Todo key={_todo._id} _todo={_todo} setTodos={setTodos} />;
          })}
      </div>
    </main>
  );
}

export default App;
