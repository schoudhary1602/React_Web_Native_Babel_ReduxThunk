
const baseUrl = "/api/";
let commonHeaders = {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
}


const doLogin = (payload) => fetch(`${baseUrl}auth/authorize`, {
    method: 'POST',
    headers: {
        ...commonHeaders,
    },
    body: JSON.stringify(payload)
}).then(response => response.json());


export default {
    login: login,
}