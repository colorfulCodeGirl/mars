import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import throttle from "lodash/throttle";

import reducer from "./reducer";
import rootSaga from "./sagas";
import { loadState, saveState } from "./loadStorage";

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const persistedState = loadState();
  const store = createStore(
    reducer,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? compose(
          applyMiddleware(sagaMiddleware),
          window.__REDUX_DEVTOOLS_EXTENSION__()
        )
      : applyMiddleware(sagaMiddleware)
  );
  store.subscribe(
    throttle(() => {
      saveState({ ...store.getState() });
    }, 1000)
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
