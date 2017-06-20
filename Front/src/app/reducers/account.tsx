import { handleActions } from 'redux-actions';
import { IAccount } from '../constants/ReducerType';

const initialState = new(IAccount);

export default handleActions({
  'get user info success' (state: IAccount = initialState, action: any) {
    if (!action.payload) {
      return state;
    }
    return state.update('data', v => action.payload);
  },
  'delete user info' (state: IAccount = initialState) {
    return state.update('data', v => null);
  }
}, initialState);
