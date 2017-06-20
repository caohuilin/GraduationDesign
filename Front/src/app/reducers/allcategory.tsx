
import { handleActions } from 'redux-actions';
import { List } from 'immutable';

import { IAllCategory } from '../constants/ReducerType';
const initialState = new(IAllCategory);

export default handleActions({
  'get category list success' (state: IAllCategory = initialState, action: any) {
    if (!action.payload) {
      return state;
    }
    return state.update('list', v => List(action.payload));
  }
}, initialState);
