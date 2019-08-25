export function stateReducer(draft, action) {
  switch (action.type) {
    case "todos":
      draft.todos = action.payload;
      return;
    case "field": {
      draft[action.fieldName] = action.payload;
      return;
    }
    case "login": {
      draft.error = "";
      draft.isLoading = true;
      return;
    }
    case "success": {
      draft.isLoggedIn = true;
      draft.isLoading = false;
      draft.username = "";
      draft.password = "";
      return;
    }
    case "error": {
      draft.error = "Incorrect username or password!";
      draft.isLoggedIn = false;
      draft.isLoading = false;
      draft.username = "";
      draft.password = "";
      return;
    }
    case "logOut": {
      draft.isLoggedIn = false;
      return;
    }
    case "toggleTodoCompleted": {
      const todo = draft.todos.find(item => item.title === action.payload);
      todo.completed = !todo.completed;
      return;
    }
    case "addTodo": {
      draft.todos.push(action.payload);
      return;
    }
    case "removeTodo": {
      draft.todos = draft.todos.filter(item => item.title !== action.payload);
      return;
    }
    default:
      return;
  }
}

export const initialState = {
  username: "",
  password: "",
  isLoading: false,
  error: "",
  isLoggedIn: false,
  todos: []
};
