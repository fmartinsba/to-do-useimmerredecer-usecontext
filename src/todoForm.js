import React, { useContext } from "react";
import { DispatchContext } from "./customProvider";

export const TodoForm = () => {
  const textInput = React.createRef();
  const dispatch = useContext(DispatchContext);
  const onSubmit = e => {
    e.preventDefault();
    dispatch({
      type: "addTodo",
      payload: { title: textInput.current.value, completed: false }
    });
    textInput.current.value = "";
  };
  return (
    <form className="form" onSubmit={onSubmit}>
      <input data-testid="input-item" type="text" placeholder="new todo item..." ref={textInput} />
      <button data-testid="add-item" type="submit" className="submit">
        add
      </button>
    </form>
  );
};
