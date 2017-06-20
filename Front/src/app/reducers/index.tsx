import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer } from 'redux-form/immutable';
import allbooklist from './allbooklist';
import allcategory from './allcategory';
import bookinfo from './bookinfo';
import content from './content';
import bright from './bright';
import font from './font';
import auth from './auth';
import search from './search';
import account from './account';
import collect from './collect';
import recommend from './recommend';
import userstatus from './userStatus';

const rootReducer = combineReducers({
  routing,
  form: reducer,
  allbooklist,
  allcategory,
  bookinfo,
  content,
  bright,
  font,
  auth,
  search,
  account,
  collect,
  recommend,
  userstatus
});

export default rootReducer;
