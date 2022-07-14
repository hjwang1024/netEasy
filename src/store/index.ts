import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';
import { reducer as homeReducer } from '../components/Home/store';

const reducers = combineReducers({
  reducer,
  home: homeReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
