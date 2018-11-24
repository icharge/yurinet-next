import { actionTypes } from '../constants/count';

export const serverRenderClock = (isServer) => dispatch => {
  return dispatch({ type: actionTypes.TICK, light: !isServer, ts: Date.now() });
};

export const startClock = () => dispatch => {
  return setInterval(() => dispatch({
    type: actionTypes.TICK,
    light: true,
    ts: Date.now(),
    __DO_NOT_LOG__: true,
  }), 1000);
};

export const addCount = () => dispatch => {
  return dispatch({ type: actionTypes.ADD });
};
