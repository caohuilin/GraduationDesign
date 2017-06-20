import { handleActions } from 'redux-actions';
import { List } from 'immutable';

import { ISearchBookList } from '../constants/ReducerType';

const initialState = new(ISearchBookList);

export default handleActions({
  'search books success' (state: ISearchBookList = initialState, action: any) {
    return state.update ('list', v => List(action.payload));
  },
  'clear search books list' (state: ISearchBookList = initialState) {
    return state.update ('list', v => List());
  }
}, initialState);
