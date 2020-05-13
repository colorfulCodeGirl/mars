import * as actionTypes from "./actionTypes";

export const fetchManifest = (value) => ({
  type: actionTypes.FETCH_MANIFEST,
  payload: value,
});

export const setManifest = (manifest) => ({
  type: actionTypes.SET_MANIFEST,
  payload: manifest,
});

export const fetchManifestFailed = (error) => ({
  type: actionTypes.FETCH_MANIFEST_FAILED,
  payload: error,
});

export const validatePeriod = (value, solSwitcher) => ({
  type: actionTypes.VALIDATE_PERIOD,
  payload: { value, solSwitcher },
});

export const setSOL = (payload) => ({
  type: actionTypes.SET_SOL,
  payload,
});

export const setDate = (payload) => ({
  type: actionTypes.SET_DATE,
  payload,
});

export const fetchPhotos = (latest) => ({
  type: actionTypes.FETCH_PHOTOS,
  latest,
});

export const setPhotos = (photos) => ({
  type: actionTypes.SET_PHOTOS,
  payload: photos,
});

export const fetchPhotosFailed = (error) => ({
  type: actionTypes.FETCH_PHOTOS_FAILED,
  payload: error,
});

export const cleanUpPeriod = () => ({
  type: actionTypes.CLEAN_UP_PERIOD,
});

export const cleanUpPhotos = () => ({
  type: actionTypes.CLEAN_UP_PHOTOS,
});

export const cleanUpForm = () => ({
  type: actionTypes.CLEAN_UP_FORM,
});

export const setFromUrl = (payload) => ({
  type: actionTypes.SET_FROM_URL,
  payload,
});

export const setAllowDataFromUrl = (payload) => ({
  type: actionTypes.SET_ALLOW_DATA_FROM_URL,
  payload,
});

export const setSolSwitcher = (payload) => ({
  type: actionTypes.SET_SOL_SWITCHER,
  payload,
});
