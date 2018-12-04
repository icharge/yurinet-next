import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import reducer, { initialState } from './reducers';
import fetchMiddleware from './reducers/middleware/fetchMiddleware';
import { isServer } from './lib/appUtil';

export default (state = initialState) => {
  const middlewares = [thunkMiddleware];

  if (!isServer) {

    middlewares.push(fetchMiddleware);

    if (process.env.NODE_ENV !== 'production') {
      middlewares.push(createLogger({
        predicate: (getState, action) => !action.__DO_NOT_LOG__,
        collapsed: true,
      }));
    }

  }

  return createStore(
    reducer,
    state,
    compose(applyMiddleware(...middlewares)),
  );
};
