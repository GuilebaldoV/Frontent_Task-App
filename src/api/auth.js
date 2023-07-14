import axios from './axios'
// peticiones
export const registerRequest=user=>axios.post(`/register`,user)
export const loginRequest=user=>axios.post(`/login`,user)
export const verifyTokenRequest=user=>axios.get(`/verify`,user)
