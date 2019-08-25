import React, { useContext } from "react";
import { login } from "./utils";
import { StateContext, DispatchContext } from "./customProvider";

export const LoginForm = () => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const { username, password, isLoading, error, isLoggedIn } = state;
  const onSubmit = async e => {
    e.preventDefault();
    dispatch({ type: "login" });
    try {
      await login({ username, password });
      dispatch({ type: "success" });
    } catch (error) {
      dispatch({ type: "error" });
    }
  };
  return (
    <div className="login-container">
        {isLoggedIn ? (
          <div>
            <h1 data-testid="welcome-user">Welcome!</h1>
            <button
              data-testid="logout-button"
              className="logout"
              onClick={() => dispatch({ type: "logOut" })}
            >
              Log Out
            </button>
          </div>
        ) : (
          <form className="form" onSubmit={onSubmit}>
            {error && <p data-testid="error-message" className="error">{error}</p>}
            <p>Please Login!</p>
            <input
              data-testid="username-input"
              type="text"
              placeholder="username"
              value={username}
              onChange={e =>
                dispatch({
                  type: "field",
                  fieldName: "username",
                  payload: e.currentTarget.value
                })
              }
            />
            <input
              data-testid="password-input"
              type="password"
              placeholder="password"
              autoComplete="new-password"
              value={password}
              onChange={e =>
                dispatch({
                  type: "field",
                  fieldName: "password",
                  payload: e.currentTarget.value
                })
              }
            />
            <button data-testid="submit-button" className="submit" type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </form>
        )}
      </div>
  );
};
