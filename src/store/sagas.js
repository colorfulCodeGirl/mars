import { put, select, takeEvery } from "redux-saga/effects";
import { fetchData } from "../helpers";
import * as actions from "./actionCreators";
import * as actionTypes from "./actionTypes";
import { getMaxSol, getStartDate, getEndDate, getDate } from "./selectors";
import { validateDate, formateDate } from "../helpers";

function* fetchManifest({ payload: rover }) {
  const urlParams = `manifests/${rover}?`;
  try {
    const response = yield fetchData(urlParams);
    const {
      photo_manifest: {
        max_sol: maxSol,
        landing_date: startDate,
        max_date: endDate,
      },
    } = response;
    yield put(actions.setManifest({ rover, maxSol, startDate, endDate }));
  } catch (error) {
    yield put(actions.fetchManifestFailed(error));
  }
}

function* validatePeriod({ payload: { value, isSol } }) {
  if (isSol) {
    const maxSol = yield select(getMaxSol);
    const numVal = +value;
    const isValid = numVal >= 0 && numVal <= maxSol && value.length !== 0;
    const massage = isValid ? "" : `SOL should be a number from 0 to ${maxSol}`;
    yield put(actions.setSOL({ sol: value, massage }));
  } else {
    const startDate = yield select(getStartDate);
    const endDate = yield select(getEndDate);
    const date = yield select(getDate);
    const formattedDate = formateDate(value, date);
    const isValid = validateDate(startDate, endDate, formattedDate);
    const massage = isValid
      ? ""
      : `SOL should be from ${startDate} to ${endDate}`;
    yield put(actions.setDate({ date: formattedDate, massage }));
  }
}

function* rootSaga() {
  yield takeEvery(actionTypes.FETCH_MANIFEST, fetchManifest);
  yield takeEvery(actionTypes.VALIDATE_PERIOD, validatePeriod);
}

export default rootSaga;
