import React, { createContext, useReducer } from "react";
import { reducer } from "./reducer";

const initialState = {
  rover: "",
  sol: "",
  date: "",
  error: false,
  startDate: "",
  endDate: "",
  maxSol: "max",
  photos: [],
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store };
export default StateProvider;
