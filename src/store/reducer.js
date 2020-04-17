import { fetchData, validateDate, formateDate } from "../helpers";
import * as actionTypes from "./actionTypes";

const setSolDates = (rover, setter) => {};

export const formReducer = (state, action) => {
  const { type, value } = action;

  switch (type) {
    case actionTypes.SET_MANIFEST:
      const urlParams = `manifests/${value}?`;
      fetchData(urlParams).then((data) => {
        const {
          photo_manifest: {
            max_sol: maxSol,
            landing_date: startDate,
            max_date: endDate,
          },
        } = data;
        return {
          ...state,
          rover: value,
          maxSol,
          startDate,
          endDate,
        };
      });
    case actionTypes.SET_SOL:
      const solError =
        +value >= 0 && +value <= +action.validationData && value.length !== 0
          ? false
          : true;
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
