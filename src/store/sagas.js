import { put, takeEvery } from "redux-saga/effects";
import { fetchData } from "../helpers";
import * as actions from "./actionCreators";
import * as actionTypes from "./actionTypes";

function* fetchManifest(rover) {
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

function* validateSOL(value) {}

function* rootSaga() {
  yield takeEvery(actionTypes.FETCH_MANIFEST, fetchManifest);
}

export default rootSaga;
