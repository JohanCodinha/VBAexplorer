import { guestLogin, /* recordsByPosition,*/ searchSpecies } from '../api/vba';
import * as types from './mutation-types';

export const fetchToken = ({ commit }) => new Promise((resolve, reject) => {
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


export const getPosition = ({ commit }) => {
  commit(types.SET_POSITION, {
    accuracy: '12',
    latitude: '-36.731842',
    longitude: '147.812758',
  });
  // const options = {
  //   enableHighAccuracy: true,
  //   timeout: 10000,
  //   maximumAge: 0,
  // };
  // return new Promise((resolve, reject) => {
  //   if (!('geolocation' in navigator)) {
  //     reject(new Error("Device doesn't support geolocation"));
  //   }
  //   navigator.geolocation.getCurrentPosition(
  //     (pos) => {
  //       const accuracy = pos.coords.accuracy;
  //       const latitude = pos.coords.latitude;
  //       const longitude = pos.coords.longitude;
  //       console.log(`Position aquired, accuracy : ${pos.coords.accuracy}`);
  //       resolve({ accuracy, latitude, longitude });
  //     },
  //     (err) => {
  //       // On error default to set location.
  //       console.log(new Error(err.message));
  //       resolve({
  //         accuracy: '12',
  //         latitude: '-36.731842',
  //         longitude: '147.812758',
  //       });
  //     }, options);
  // })
  // .then(position => commit(types.SET_POSITION, position))
  // .catch(error => console.log(error));
};

function speciesByPosition (position, token, commit) {
  return new Promise((resolve, reject) => {
    searchSpecies(position, token)
      .then((species) => {
        if (!species) {
          return reject(new Error('Species search failled'));
        }
        species.forEach(specie => commit(types.ADD_SPECIE, specie));
        return resolve(species.length);
      })
      .catch(error => console.log(error));
  });
}

export const fetchSpecies = ({ commit, getters, dispatch }) => {
  const token = getters.accesToken;
  const searchArea = getters.searchArea;

  if (!token) {
    console.log('no token found');
    return dispatch('fetchToken')
      .then(() => {
        if (!searchArea) {
          console.log('no pos found');
          return dispatch('getPosition');
        }
        return searchArea;
      })
      .then(() => {
        const freshToken = getters.accesToken;
        const freshSearchArea = getters.searchArea;
        return speciesByPosition(freshSearchArea, freshToken, commit);
      });
  }
  if (!searchArea) {
    return dispatch('getPosition')
      .then(() => {
        const freshSearchArea = getters.searchArea;
        return speciesByPosition(freshSearchArea, token, commit);
      });
  }
  return speciesByPosition(searchArea, token, commit);
};
