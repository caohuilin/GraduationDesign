
import { handleActions } from 'redux-actions';
import { List } from 'immutable';

import { IAllBookList } from '../constants/ReducerType';

const initialState = new(IAllBookList);

export default handleActions({
  'get category books list success' (state: IAllBookList = initialState, action: any) {
    return state.update ('list', v => List(action.payload));
  },
  'clear books list' (state: IAllBookList = initialState) {
    return state.update ('list', v => List());
  }
}, initialState);
