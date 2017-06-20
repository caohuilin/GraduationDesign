
import { handleActions } from 'redux-actions';
import { List } from 'immutable';

import { IContent } from '../constants/ReducerType';

const initialState = new(IContent);

export default handleActions({
  'get content success' (state: IContent = initialState, action: any) {
    if (!action.payload) {
      return state;
    }
    return state.update('content',  v => List(action.payload.contents));
  },
  'get page width' (state: IContent = initialState, action: any) {
    if (!action.payload) {
      return state;
    }
    return state.update('everyWidth', v => action.payload.everyWidth)
                .update('page', v => action.payload.page);
  }
}, initialState);
