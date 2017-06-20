import { handleActions } from 'redux-actions';

import { IBright } from '../constants/ReducerType';

const initialState = new(IBright);

export default handleActions({
  'change screen bright' (state: IBright = initialState, action: any) {
    if (!action.payload) {
      return state;
    }
    return state.update('left', v => action.payload);
  },
  'set night mode' (state: IBright = initialState) {
    return state.update('night', v => !state.get('night'));
  }
}, initialState);
