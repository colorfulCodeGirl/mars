import * as actionTypes from "./actionTypes";

const initialState = {
  rover: "",
  sol: "",
  date: "",
  error: "",
  startDate: "",
  endDate: "",
  maxSol: 0,
  photos: [],
  fetchError: "",
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.SET_MANIFEST:
      return {
        ...state,
        ...payload,
      };
    case actionTypes.FETCH_MANIFEST_FAILED:
      return {
        ...state,
        fetchError: payload,
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
    case actionTypes.CLEAN_UP_PHOTOS:
      return {
        ...state,
        photos: [],
      };
    case actionTypes.CLEAN_UP_FORM:
      return initialState;
    case actionTypes.SET_PHOTOS:
      return {
        ...state,
        photos: payload,
      };
    case actionTypes.FETCH_PHOTOS_FAILED:
      return {
        ...state,
        fetchError: payload,
      };
    default:
      return state;
  }
};

export default reducer;
