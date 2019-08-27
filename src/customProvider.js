import React from "react";
import { useImmerReducer } from "use-immer";
import { stateReducer, initialState } from "./stateReducer";

const StateContext = React.createContext();
const DispatchContext = React.createContext();
const CustomProvider = ({ children, injectedState }) => {
  const [state, dispatch] = useImmerReducer(stateReducer, { ...initialState, ...injectedState });
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export { CustomProvider, StateContext, DispatchContext };
