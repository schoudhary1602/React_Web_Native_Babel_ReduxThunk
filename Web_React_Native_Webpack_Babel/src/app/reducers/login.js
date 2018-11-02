

import {
  REQ_FAIL,
  DO_LOGIN_SUCCESS,
  DO_SIGNUP_SUCCESS,
  FORGOT_PASSWORD,
  UPDATE_PASSWORD
}
  from '../actions/LoginAction'


const initialState = {
  loginReducer: {},
  isLoggedIn: false
};

export const loginReducer = (state = initialState, action) => {
  console.log("In loginReducer...");
  switch (action.type) {
    case DO_LOGIN_SUCCESS:
      return {
        ...state,
        loginResponse: action.data,
        isLoggedIn: action.data.success
      }
    case REQ_FAIL:
      return {
        ...state,
        reqFailed: action.data,
      }
    case DO_SIGNUP_SUCCESS:
      return {
        ...state,
        signupResponse: action.data,
        isSignupSuccess: action.data.success
      }
    case FORGOT_PASSWORD:
      return {
        ...state,
        forgetPassword: action.data,
        forgotStatus: action.data.success
      }
    case UPDATE_PASSWORD:
      return {
        ...state,
        updatePassword: action.data,
        updateSuccess: action.data.success
      }
    default:
      return state

  }

}
