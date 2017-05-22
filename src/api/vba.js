import axios from 'axios';

const apiUrl = 'https://vbapi.herokuapp.com';

export const guestLogin = () => axios
  .get(`${apiUrl}/auth/guest`)
  .then(res => res.data.jwt)
  .catch(error => console.log(error.message));

export const searchSpecies = (position, token) => axios
  .get(`${apiUrl}/search/point`, {
    headers: { 'x-access-token': token },
    params: position,
  })
  .then(res => res.data.records)
  .catch(error => console.log(error.message));

export const recordsByPosition = (position, token) => axios
  .get(`${apiUrl}/search/point`, {
    headers: { 'x-access-token': token },
    params: Object.assign({}, position, { detail: true }),
  })
  .then(res => res.data.records)
  .catch(error => console.log(error.message));

export const vbaSpecieSearch = taxonId => axios
  .get(`${apiUrl}/species/${taxonId}`)
  .then(res => res.data)
  .catch(error => console.log(error.message));
