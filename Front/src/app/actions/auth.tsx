import { createAction } from 'redux-actions';

export const loginRequest  = createAction('login request');
export const registerRequest  = createAction('register request');
export const getUserInfo  = createAction('get user info');
export const deleteUserInfo  = createAction('delete user info');
