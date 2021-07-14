import axios from 'axios';
import { returnErrors } from './errorActions';
import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from './types';

export const loadUser = () => (dispath, getState) => {
  //User loading
  dispath({ type: USER_LOADING });

  axios.get('/api/user', tokenConfig(getState))
    .then(res => dispath({
      type: USER_LOADED,
      payload: res.data
    }))
    .catch(err => {
      dispath(returnErrors(err.response.data, err.response.status));
      dispath({
        type: AUTH_ERROR
      });
    });
}

export const register = ({name, email, password}) => dispath => {
  //headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  //register body
  const body = JSON.stringify({name, email, password});

  axios.post('/api/register', body, config )
    .then(res => dispath({
      type: REGISTER_SUCCESS,
      payload: res.data
    }))
    .catch(err => {
      dispath(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
      dispath({
        type: REGISTER_FAIL
      });
    });
}

export const login = ({ email, password }) => dispath => {
  //headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  //request body
  const body = JSON.stringify({ email, password });

  axios.post('/api/login', body, config )
    .then(res => dispath({
      type: LOGIN_SUCCESS,
      payload: res.data
    }))
    .catch(err => {
      dispath(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
      dispath({
        type: LOGIN_FAIL
      });
    });
}

//logout user
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}

// Setup config/headers and token
export const tokenConfig = getState => {
  // Get token from local storage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if(token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
}