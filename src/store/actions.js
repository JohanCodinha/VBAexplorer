import { guestLogin, recordsByPosition, speciesByPosition } from '../api/vba';
import * as types from './mutation-types';


export const fetchToken = ({ commit }) => {
  guestLogin()
    .then((token) => {
      console.log('response body : ', token);
      commit('SET_TOKEN', token);
    });
};

export const getPosition = ({ commit }) => {
  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  };
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error("Device doesn't support geolocation"));
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const accuracy = pos.coords.accuracy;
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        console.log(`Position aquired, accuracy : ${pos.coords.accuracy}`);
        resolve({ accuracy, latitude, longitude });
      },
      (err) => {
        // On error default to set location.
        console.log(new Error(err.message));
        resolve({
          accuracy: '12',
          latitude: '-36.731842',
          longitude: '147.812758',
        });
      }, options);
  })
  // -36.731842, 147.812758
  // eslint-disable-next-line
  // return new Promise((resolve, reject) => {
  //   resolve({ accu: '12', lat: '-36.731842', long: '147.812758' });
  // })
  .then(position => commit('SET_POSITION', position))
  .catch(error => console.log(error));
};


export const searchRecords = ({ commit, state }) => {
  const token = state.token;
  const position = {
    lat: state.position.latitude,
    long: state.position.longitude,
    rad: state.searchRadius,
  };
  // fetch species
  speciesByPosition(position, token)
    .then((species) => {
      species.forEach(specie => commit(types.SET_SPECIE, specie));
    });
  // fetch records
  recordsByPosition(position, token)
    .then((records) => {
      records.forEach(record => commit(types.SET_RECORD, record));
    });
};
