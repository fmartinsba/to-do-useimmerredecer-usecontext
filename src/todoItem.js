import React, { useContext } from "react";
import { StateContext, DispatchContext } from "./customProvider";

export function TodoItem({ title, completed }) {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const { isLoggedIn } = state;
  return (
    <div
      className="todoItem">
      <input
        data-testid="complete-item"
        type="checkbox"
        checked={completed}
        onClick={() => {
          if (!isLoggedIn) {
            alert("Please login to click this!");
          }
        }}
        onChange={() => {
          if (isLoggedIn) {
            dispatch({ type: "toggleTodoCompleted", payload: title });
          }
        }}
      />
      <p data-testid="todo-title" style={completed ? { textDecoration: "line-through" } : null}>
        {title}
      </p>
      <button
        data-testid="remove-item"
        onClick={() => {
          if (!isLoggedIn) {
            alert("Please login to click this!");
          } else {
            dispatch({ type: "removeTodo", payload: title });
          }
        }}
      >
        remove
      </button>
    </div>
  );
}
