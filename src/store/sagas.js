import { put, select, takeEvery, take } from "redux-saga/effects";

import * as actions from "./actionCreators";
import * as actionTypes from "./actionTypes";
import {
  getMaxSol,
  getStartDate,
  getEndDate,
  getDate,
  getRover,
  getSol,
} from "./selectors";

import { fetchData, validateDate, formateDate } from "../helpers";

function* fetchManifest({ payload: rover }) {
  yield put(actions.cleanUpForm());
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

function* fetchPhotos({ latest = null }) {
  yield put(actions.cleanUpPhotos());
  const rover = yield select(getRover);
  const sol = yield select(getSol);
  const date = yield select(getDate);
  const urlParams = latest
    ? `rovers/${rover}/latest_photos?`
    : sol
    ? `rovers/${rover}/photos?sol=${sol}`
    : `rovers/${rover}/photos?earth_date=${date}`;
  try {
    const response = yield fetchData(urlParams);
    const newPhotos = response.latest_photos || response.photos;
    yield put(actions.setPhotos(newPhotos));
  } catch (error) {
    yield put(actions.fetchPhotosFailed(error));
  }
}

function* setFromUrl({ payload: params }) {
  const rover = params.get("rover");
  yield put(actions.fetchManifest(rover));
  const latest = params.get("latest");
  yield take(actionTypes.SET_MANIFEST);
  if (latest === "true") {
    yield put(actions.fetchPhotos(latest));
  } else {
    const sol = params.get("sol");
    const date = params.get("date");
    if (sol) yield put(actions.setSOL({ sol, massage: "" }));
    if (date) yield put(actions.setDate({ date, massage: "" }));
    yield put(actions.fetchPhotos());
  }
}

function* rootSaga() {
  yield takeEvery(actionTypes.FETCH_MANIFEST, fetchManifest);
  yield takeEvery(actionTypes.VALIDATE_PERIOD, validatePeriod);
  yield takeEvery(actionTypes.FETCH_PHOTOS, fetchPhotos);
  yield takeEvery(actionTypes.SET_FROM_URL, setFromUrl);
}

export default rootSaga;
