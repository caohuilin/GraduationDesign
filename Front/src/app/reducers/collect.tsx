import { handleActions } from 'redux-actions';
import { List } from 'immutable';

import { ICollectBookList } from '../constants/ReducerType';

const initialState = new(ICollectBookList);

export default handleActions({
  'get collect books success' (state: ICollectBookList = initialState, action: any) {
    return state.update ('list', v => List(action.payload.books));
  },
}, initialState);
