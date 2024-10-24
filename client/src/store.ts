import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware } from "redux-observable";
import createSagaMiddleware from "redux-saga";
import { injectStoreToServer } from "./actions/server";
import { rootEpic } from "./epics";
import { reducer } from "./reducers/reducer";
import { rootSaga } from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const epicMiddleware = createEpicMiddleware();

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, epicMiddleware)),
);

sagaMiddleware.run(rootSaga);
epicMiddleware.run(rootEpic);

injectStoreToServer(store);