import {
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS
} from './auth'

export const SET_TOKEN = 'SET_TOKEN';

export const defaultState = {}

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
    case SET_TOKEN:
      return action.payload
    default:
      return state
  }
}

export function setToken (token) {
  return {
    type: SET_TOKEN,
    payload: { token }
  }
}
