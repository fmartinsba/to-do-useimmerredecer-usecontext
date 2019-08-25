import React, { useEffect, useContext } from "react";
import { fetchTodos } from "./utils";
import { LoginForm } from "./loginForm";
import { TodoForm } from "./todoForm";
import { TodoItem } from "./todoItem";
import { StateContext, DispatchContext } from "./customProvider";
import { useEffectOnce } from "./useEffectOnce";

export default function App() {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const { username, isLoggedIn, todos } = state;

  useEffectOnce(() => {
    const _todos = JSON.parse(localStorage.getItem("todos"));
    if (_todos)
      dispatch({ type: "todos", payload: _todos });
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="App useContext">
      <LoginForm />
      {isLoggedIn ? <TodoForm /> : null}
      <div className="todoContainer">
        <h2>Todos</h2>
          {todos.map(item => (
            <TodoItem key={item.title} {...item} />
          ))}
      </div>
    </div>
  );
}
