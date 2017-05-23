import { guestLogin, /* recordsByPosition,*/ searchSpecies } from '../api/vba';
import * as types from './mutation-types';

export const FETCH_TOKEN = ({ commit }) =>
  new Promise((resolve, reject) => {
    guestLogin()
      .then((token) => {
        if (!token) {
          reject(new Error('failled to fetch token'));
        }
        console.log('response body : ', token);
        commit('SET_TOKEN', token);
        resolve(token);
      });
  });


export const GET_POSITION = ({ commit }) => {
  // commit(types.SET_POSITION, {
  //   accuracy: '12',
  //   latitude: '-36.731842',
  //   longitude: '147.812758',
  // });
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
  .then(position => commit(types.SET_POSITION, position))
  .catch(error => console.log(error));
};

export const SEARCH_SPECIES = async ({ commit, getters, dispatch }) => {
  if (!getters.accesToken) {
    await dispatch('FETCH_TOKEN');
  }
  if (!getters.searchArea) {
    await dispatch('GET_POSITION');
  }
  const token = getters.accesToken;
  const searchArea = getters.searchArea;
  // return speciesByPosition(searchArea, token, commit);
  return searchSpecies(searchArea, token)
    .then((species) => {
      if (!species) {
        return new Error('Species search failled');
      }
      species.forEach(specie => commit(types.ADD_SPECIE, specie));
      return species.length;
    })
    .catch(error => console.log(error));
};
