import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import reducer from "./reducer";
import rootSaga from "./sagas";

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? compose(
          applyMiddleware(sagaMiddleware),
          window.__REDUX_DEVTOOLS_EXTENSION__()
        )
      : applyMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
