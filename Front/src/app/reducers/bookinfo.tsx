
import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

import { IBookInfo } from '../constants/ReducerType';

const initialState = new(IBookInfo);

export default handleActions({
  'get book info success' (state: IBookInfo = initialState, action: any) {
    if (!action.payload) {
      return state;
    }
    return state.update('content', v => Map(action.payload));
  }
}, initialState);
