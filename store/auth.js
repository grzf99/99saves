import Cookies from 'js-cookie';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const LOGOUT = 'LOGOUT';

export const USER_LOCALSTORAGE_KEY = '99-user';
export const TOKEN_COOKIE_KEY = '99-token';

export const defaultState = {
  login: {
    loading: false
  },
  signup: {
    loading: false
  }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        login: {
          loading: true,
          error: undefined
        }
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          loading: false
        }
      };
    case LOGIN_ERROR:
      return {
        ...state,
        login: {
          loading: false,
          error: action.error
        }
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        signup: {
          loading: true,
          error: undefined
        }
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signup: {
          loading: false
        }
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        signup: {
          loading: false,
          error: action.error
        }
      };
    default:
      return state;
  }
};

function handleAuthSuccess(payload) {
  window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(payload));
  Cookies.set(TOKEN_COOKIE_KEY, payload.token);
}

export function login(email, password, admin = false) {
  return {
    api: {
      types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR],
      url: admin ? '/auth/login/admin' : '/auth/login',
      method: 'POST',
      data: { email, password },
      onSuccess: payload => handleAuthSuccess(payload)
    }
  };
}

export function signup(user) {
  return {
    api: {
      types: [SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_ERROR],
      url: '/users',
      method: 'POST',
      data: { user },
      onSuccess: payload => handleAuthSuccess(payload)
    }
  };
}

export function logout() {
  window.localStorage.removeItem(USER_LOCALSTORAGE_KEY);
  Cookies.remove(TOKEN_COOKIE_KEY);
  return { type: LOGOUT };
}
