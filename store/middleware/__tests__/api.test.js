import moxios from 'moxios'
import createApiClient from '../../../utils/apiClient'
import config from '../../../config'
import apiMiddleware from '../api'

let store
let next
let api = createApiClient()
beforeEach(() => {
  store = {
    dispatch: jest.fn(),
    getState: jest.fn(() => ({ currentUser: {} }))
  }
  next = jest.fn()
  moxios.install(api)
})
afterEach(() => moxios.uninstall(api))

test('passes if action has no "api" object', () => {
  const action = { type: 'MY_ACTION' }
  apiMiddleware(api)(store)(next)(action)

  expect(next).toHaveBeenCalledWith(action)
})

test('dispatches request and success actions if request succeeds', () => {
  const action = {
    api: {
      types: ['MY_REQUEST', 'MY_SUCCESS', 'MY_ERROR'],
      url: '/my_endpoint',
      method: 'GET'
    }
  }
  moxios.stubRequest(`${config.API_URL}/my_endpoint`, {
    status: 200,
    response: { my: 'payload' }
  })

  return apiMiddleware(api)(store)(next)(action)
    .then(() => {
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'MY_REQUEST' })
      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'MY_SUCCESS',
        payload: { my: 'payload' }
      })
    })
})

test('dispatches request and error actions if request errors', () => {
  const action = {
    api: {
      types: ['MY_REQUEST', 'MY_SUCCESS', 'MY_ERROR'],
      url: '/my_endpoint',
      method: 'GET'
    }
  }
  moxios.stubRequest(`${config.API_URL}/my_endpoint`, {
    status: 500,
    response: { my: 'error' }
  })

  return apiMiddleware(api)(store)(next)(action)
    .then(() => {
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'MY_REQUEST' })
      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'MY_ERROR',
        error: { my: 'error' }
      })
    })
})
