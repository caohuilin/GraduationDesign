import { handleActions } from 'redux-actions';

import { IFont } from '../constants/ReducerType';

const initialState = new(IFont);

export default handleActions({
  'set font size' (state: IFont = initialState, action: any) {
    if (!action.payload) {
      return state;
    }
    if (action.payload === '+') {
      return state.update('fontSize', v => state.get('fontSize') + 1);
    }
    return state.update('fontSize', v => state.get('fontSize') - 1);
  }
}, initialState);
