import { handleActions } from 'redux-actions';
import { updateJWT } from '../middleware/api';
import { IAuth } from '../constants/ReducerType';

const initialState = new(IAuth);

export default handleActions({
  'login success' (state: IAuth = initialState, action: any) {
    if (!action.payload) {
      return state;
    }
    updateJWT(action.payload.jwt);
    return state.update('login', v => v.update('data', v => action.payload));
  },
  'login failed' (state: IAuth = initialState, action: any) {
    if (!action.error) {
      return state;
    }
    return state.update('login', v => v.update('error', v => action.error));
  },
  'register success' (state: IAuth = initialState, action: any) {
    if (!action.payload) {
      return state;
    }
    updateJWT(action.payload.jwt);
    return state.update('register', v => v.update('data', v => action.payload));
  },
  'register failed' (state: IAuth = initialState, action: any) {
    if (!action.error) {
      return state;
    }
    return state.update('register', v => v.update('error', v => action.error));
  },
  'delete user info' (state: IAuth = initialState) {
    return state.update('login', v => v.update('data', v => null));
  }
}, initialState);
