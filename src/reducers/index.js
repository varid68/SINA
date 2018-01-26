import { combineReducers } from 'redux';
import providerReducer from './providerReducer';
import directiveReducer from './directiveReducer';

export default combineReducers({
  providerReducer,
  directiveReducer,
});
