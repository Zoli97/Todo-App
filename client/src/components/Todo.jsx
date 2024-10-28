import React from "react";

const Todo = ({ _todo, setTodos }) => {
  const updateTodo = async (todoId, todostatus) => {
    const resp = await fetch(`/api/todos/${todoId}`, {
      method: "PUT",
      body: JSON.stringify({ status: todostatus }),
      headers: { "Content-Type": "application/json" },
    });

    const json = await resp.json();

    //it will send back an object with ack varset true or false
    //if currentTodo is equal todoid the one i updated
    if (json.acknowledged) {
      setTodos((currentTodos) => {
        return currentTodos.map((currentTodo) => {
          if (currentTodo._id === todoId) {
            return { ...currentTodo, status: !currentTodo.status };
          }
          return currentTodo;
        });
      });
    }
  };

  const deleteTodo = async (todoId) => {
    const resp = await fetch(`/api/todos/${todoId}`, {
      method: "DELETE",
    });

    //return eevry single todo accept for the one that matches the id
    const json = await resp.json();
    if (json.acknowledged) {
      setTodos((currentTodos) => {
        return currentTodos.filter((currentTodo) => currentTodo._id !== todoId);
      });
    }
  };
  return (
    <>
      {" "}
      <div className="todo ">
        {/* Ensure todo.todo is a string or primitive */}
        <p>
          {typeof _todo.todo === "object"
            ? JSON.stringify(_todo?.todo)
            : _todo?.todo}
        </p>
        <div className="container_btns">
          <button
            onClick={() => updateTodo(_todo._id, _todo.status)}
            className="todo__status"
          >
            {_todo.status ? "☑" : "☐"}
          </button>

          <button
            onClick={() => deleteTodo(_todo._id)}
            className="todo__delete"
          >
            🗑️
          </button>
        </div>
      </div>
    </>
  );
};

export default Todo;
