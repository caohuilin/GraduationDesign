import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

import { IUserStatus } from '../constants/ReducerType';

const initialState = new(IUserStatus);

export default handleActions({
  'get user status success' (state: IUserStatus = initialState, action: any) {
    return state.update ('data', v => Map(action.payload));
  },
}, initialState);
