import {
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS
} from '../auth'
import reducer, { defaultState } from '../currentUser'

const user = { id: 1, token: 'asdf' }

describe('reducer', () => {
  test('default state', () => {
    const state = undefined
    const action = { type: '@@redux/init' }
    expect(reducer(state, action)).toEqual(defaultState)
  })

  test('on LOGIN_SUCCESS', () => {
    const state = defaultState
    const action = { type: LOGIN_SUCCESS, payload: user }
    expect(reducer(state, action)).toEqual(user)
  })

  test('on SIGNUP_SUCCESS', () => {
    const state = defaultState
    const action = { type: SIGNUP_SUCCESS, payload: user }
    expect(reducer(state, action)).toEqual(user)
  })
})
