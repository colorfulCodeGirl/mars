import * as actionTypes from "./actionTypes";

export const validatePeriod = (value, isSol) => ({
  type: actionTypes.SET_SOL,
  {value, isSol}
});

export const setSOL = (sol) => ({
  type: actionTypes.SET_SOL,
  sol,
});

export const setDate = (date) => ({
  type: actionTypes.SET_DATE,
  date,
});

export const fetchManifest = (value) => ({
  type: actionTypes.FETCH_MANIFEST,
  value
});

export const setManifest = (manifest) => ({
  type: actionTypes.SET_MANIFEST,
  manifest,
});

export const fetchManifestFailed = (error) => ({
  type: actionTypes.FETCH_MANIFEST_FAILED,
  error,
});

export const fetchPhotos = () => ({
  type: actionTypes.FETCH_PHOTOS,
});

export const setPhotos = (photos) => ({
  type: actionTypes.SET_PHOTOS,
  photos,
});
