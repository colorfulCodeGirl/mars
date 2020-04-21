import { validateDate, formateDate } from "../helpers";
import * as actionTypes from "./actionTypes";

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

const validateSOL = (value, action) =>
  +value >= 0 && +value <= +action.validationData && value.length !== 0
    ? false
    : true;

const reducer = (state = initialState, action) => {
  const { type, value } = action;

  switch (type) {
    case actionTypes.SET_MANIFEST:
      return {
        ...state,
        ...value,
      };
    case actionTypes.SET_SOL:
      const isValid = validateSOL(value, ) 
      action.allowSearch(!solError);
      return {
        ...state,
        sol: value,
        error: solError,
      };
    case actionTypes.SET_DATE:
      const formattedDate = formateDate(value, state.date);
      const dateError = !validateDate(action.validationData, formattedDate);
      action.allowSearch(!dateError);
      return {
        ...state,
        date: formattedDate,
        error: dateError,
      };
    //   case actionTypes.FETCH_PHOTOS:
    //   case actionTypes.SET_PHOTOS:
    default:
      return state;
  }
};

export default reducer;
