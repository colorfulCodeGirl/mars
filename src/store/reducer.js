import * as actionTypes from "./actionTypes";

const initialState = {
  rover: "",
  sol: "",
  date: "",
  error: "",
  startDate: "",
  endDate: "",
  maxSol: "max",
  photos: [],
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.SET_MANIFEST:
      return {
        ...state,
        ...payload,
      };
    case actionTypes.SET_SOL:
      return {
        ...state,
        sol: payload.sol,
        error: payload.massage,
      };
    case actionTypes.SET_DATE:
      return {
        ...state,
        date: payload.date,
        error: payload.massage,
      };
    case actionTypes.CLEAN_UP_PERIOD:
      return {
        ...state,
        sol: "",
        date: "",
        error: "",
      };
    case actionTypes.CLEAN_UP_FORM:
      return initialState;
    //   case actionTypes.FETCH_PHOTOS:
    //   case actionTypes.SET_PHOTOS:
    default:
      return state;
  }
};

export default reducer;
