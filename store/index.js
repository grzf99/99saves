import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import createApiMiddleware from './middleware/api'
import createApiClient from '../utils/apiClient'
import auth, { USER_LOCALSTORAGE_KEY } from './auth'
import currentUser from './currentUser'

const rootReducer = combineReducers({
  auth,
  currentUser
})

function getLoggedInUser () {
  let user
  try {
    user = JSON.parse(window.localStorage.getItem(USER_LOCALSTORAGE_KEY))
  } catch (e) {}
  return user
}

export default (initialState = {}) => {
  let composeEnhancers = compose
  let token
  if (typeof window !== 'undefined') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

    const currentUser = getLoggedInUser()
    if (currentUser) {
      token = currentUser.token
      initialState = Object.assign({}, initialState, { currentUser })
    }
  }
  const apiClient = createApiClient(token)

  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(createApiMiddleware(apiClient))
    )
  )
}
