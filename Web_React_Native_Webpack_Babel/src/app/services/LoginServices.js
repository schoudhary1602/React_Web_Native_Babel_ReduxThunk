
const baseUrl = "http://localhost:3000/";
let commonHeaders = {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'

}

export const doLogin = (payload) => fetch(`${baseUrl}auth/authorize`, {
    method: 'POST',
    headers: {
        ...commonHeaders,
    },
    body: JSON.stringify(payload)
}).then(response => response.json());


export const doSignup = (payload) => fetch(`${baseUrl}api/register/registerUser`, {
    method: 'POST',
    headers: {
        ...commonHeaders,
    },
    body: JSON.stringify(payload)
}).then(response => response.json());


export const forgotPassword = (payload) => fetch(`${baseUrl}auth/verifyemail`, {
    method: 'POST',
    headers: {
        ...commonHeaders,
        //'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
}).then(response => response.json());

export const updatePassword = (payload, token) => fetch(`${baseUrl}auth/updatepassword${token}`, {
    method: 'POST',
    headers: {
        ...commonHeaders,
        //'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
}).then(response => response.json());