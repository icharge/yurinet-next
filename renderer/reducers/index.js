import { combineReducers } from 'redux';
import count, { exampleInitialState as countState } from './count';

export const initialState = {
  count: countState,
};

export default combineReducers({
  count,
});
