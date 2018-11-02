
export const DO_LOGIN_SUCCESS = 'DO_LOGIN_SUCCESS';
export const REQ_FAIL = 'DO_LOGIN_FAIL';
export const DO_SIGNUP_SUCCESS = 'DO_SIGNUP_SUCCESS';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD'
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'

import * as  LoginService from '../services/LoginServices';


export const loginSuccess = data => (
    {
        type: DO_LOGIN_SUCCESS,
        data
    }
)

export const signupSuccess = data => (
    {
        type: DO_SIGNUP_SUCCESS,
        data
    }
)

export const reqFailed = data => (
    {
        type: REQ_FAIL,
        data
    }
)

export const fotgotPassword = data => (
    {
        type: FORGOT_PASSWORD,
        data
    }
)


export const updatePass = data => (
    {
        type: UPDATE_PASSWORD,
        data
    }
)

/**
 * Send login request using LoginService
 * @param {*} payload 
 */
export const doLogin = (payload) => dispatch => {
    console.log(payload);
    return LoginService.doLogin(payload).then(data => {

        console.log("doLogin : ", data);

        dispatch(loginSuccess(data))

    }, error => {

        dispatch(reqFailed(error))

    });

}

/**
 * Send signup request using LoginService
 * @param {*} payload 
 */
export const doSignup = (payload) => dispatch => {

    console.log(payload);
    return LoginService.doSignup(payload).then(data => {

        console.log("doSignup : ", data);
        dispatch(signupSuccess(data))

    }, error => {

        dispatch(reqFailed(error))
    });

}

// This function should do network call for action and then dispatch response to reducer
export const forgotPassword = (payload) => dispatch => {
    console.log('forgotPassword called, payload is ', payload)

    return LoginService.forgotPassword(payload).then(data => {
        dispatch(fotgotPassword(data))
    })
}

// This function should do network call for action and then dispatch response to reducer
export const updatePassword = (payload, token) => dispatch => {
    console.log('login called, payload is ', payload)

    return LoginService.updatePassword(payload, token).then(data => {
        dispatch(updatePass(data))
    })
}
