import axios from 'axios'

const BASE_URL = 'https://loft-taxi.glitch.me'

export const loginRequest = ({ email, password }) => {
  return axios
    .post(`${BASE_URL}/auth`, { email, password })
    .then(({ data }) => data)
}

export const registrationRequestApi = ({ email, password, name, surname }) => {
  return axios
    .post(`${BASE_URL}/register`, { email, password, name, surname })
    .then(({ data }) => data)
}

export const getCardInformation = (token) => {
  return axios
    .get(`${BASE_URL}/card`, { params: { token } })
    .then(({ data }) => data)
}

export const saveCardInformation = (cardData) => {
  return axios.post(`${BASE_URL}/card`, cardData).then(({ data }) => data)
}
