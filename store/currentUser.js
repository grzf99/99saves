import { LOGIN_SUCCESS, SIGNUP_SUCCESS, LOGOUT } from './auth';

export const SET_USER = 'SET_USER';

export const defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
    case SET_USER:
      return action.payload;
    case LOGOUT:
      return defaultState;
    default:
      return state;
  }
};

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  };
}
