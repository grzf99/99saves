import reducer, {
  defaultState,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  IS_EMAIL_AVAILABLE_REQUEST,
  IS_EMAIL_AVAILABLE_SUCCESS,
  IS_EMAIL_AVAILABLE_ERROR,
  login,
  signup,
  isEmailAvailable
} from '../auth';

describe('reducer', () => {
  test('default state', () => {
    const state = undefined;
    const action = { type: '@@redux/init' };
    expect(reducer(state, action)).toEqual(defaultState);
  });

  test('on LOGIN_REQUEST', () => {
    const state = defaultState;
    const action = { type: LOGIN_REQUEST };
    expect(reducer(state, action)).toEqual({
      ...defaultState,
      login: {
        loading: true
      }
    });
  });

  test('on LOGIN_SUCCESS', () => {
    const state = {
      ...defaultState,
      login: {
        loading: true
      }
    };
    const action = { type: LOGIN_SUCCESS };
    expect(reducer(state, action)).toEqual({
      ...defaultState,
      login: {
        loading: false
      }
    });
  });

  test('on LOGIN_ERROR', () => {
    const state = {
      ...defaultState,
      login: {
        loading: true
      }
    };
    const action = { type: LOGIN_ERROR, error: 'My error' };
    expect(reducer(state, action)).toEqual({
      ...defaultState,
      login: {
        loading: false,
        error: 'My error'
      }
    });
  });

  test('on SIGNUP_REQUEST', () => {
    const state = defaultState;
    const action = { type: SIGNUP_REQUEST };
    expect(reducer(state, action)).toEqual({
      ...defaultState,
      signup: {
        loading: true
      }
    });
  });

  test('on SIGNUP_SUCCESS', () => {
    const state = {
      ...defaultState,
      signup: {
        loading: true
      }
    };
    const action = { type: SIGNUP_SUCCESS };
    expect(reducer(state, action)).toEqual({
      ...defaultState,
      signup: {
        loading: false
      }
    });
  });

  test('on SIGNUP_ERROR', () => {
    const state = {
      ...defaultState,
      signup: {
        loading: true
      }
    };
    const action = { type: SIGNUP_ERROR, error: 'My error' };
    expect(reducer(state, action)).toEqual({
      ...defaultState,
      signup: {
        loading: false,
        error: 'My error'
      }
    });
  });

  test('on IS_EMAIL_AVAILABLE_REQUEST', () => {
    const state = defaultState;
    const action = { type: IS_EMAIL_AVAILABLE_REQUEST };
    expect(reducer(state, action)).toEqual({
      ...defaultState,
      signup: {
        loading: true,
        isEmailAvailable: true
      }
    });
  });

  test('on IS_EMAIL_AVAILABLE_SUCCESS', () => {
    const state = {
      ...defaultState,
      signup: {
        loading: true,
        isEmailAvailable: true
      }
    };
    const action = {
      type: IS_EMAIL_AVAILABLE_SUCCESS,
      payload: {
        isAvailable: false
      }
    };
    expect(reducer(state, action)).toEqual({
      ...defaultState,
      signup: {
        loading: false,
        isEmailAvailable: false
      }
    });
  });

  test('on IS_EMAIL_AVAILABLE_ERROR', () => {
    const state = {
      ...defaultState,
      signup: {
        loading: true,
        isEmailAvailable: true
      }
    };
    const action = {
      type: IS_EMAIL_AVAILABLE_ERROR,
      error: 'My error'
    };
    expect(reducer(state, action)).toEqual({
      ...defaultState,
      signup: {
        loading: false,
        error: 'My error'
      }
    });
  });
});

test('login action creator', () => {
  const email = 'asd@asd.com';
  const password = '123456';
  expect(login(email, password)).toMatchObject({
    api: {
      types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR],
      url: '/auth/login',
      method: 'POST',
      data: { email, password }
    }
  });
});

test('signup action creator', () => {
  const user = {
    name: 'Jon Snow',
    email: 'asd@asd.com',
    password: '123456'
  };

  expect(signup(user)).toMatchObject({
    api: {
      types: [SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_ERROR],
      url: '/users',
      method: 'POST',
      data: { user }
    }
  });
});

test('isEmailAvailable action creator', () => {
  const email = 'asd@asd.com';

  expect(isEmailAvailable(email)).toMatchObject({
    api: {
      types: [
        IS_EMAIL_AVAILABLE_REQUEST,
        IS_EMAIL_AVAILABLE_SUCCESS,
        IS_EMAIL_AVAILABLE_ERROR
      ],
      url: '/users/available?email=asd@asd.com',
      method: 'GET'
    }
  });
});
