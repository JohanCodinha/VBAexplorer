import { guestLogin, specieRecords, searchSpecies } from '../api/vba';
import searchMuseumSpecies from '../api/museumVic';
import searchALASpecies from '../api/atlasLivingAus';
import searchHerbariumSpecies from '../api/herbarium';
import * as types from './mutation-types';

export const FETCH_TOKEN = ({ commit }) =>
  new Promise((resolve, reject) => {
    guestLogin()
      .then((token) => {
        if (!token) {
          return reject(new Error('failled to fetch token'));
        }
        console.log('response body : ', token);
        commit('SET_TOKEN', token);
        return resolve(token);
      });
  }).catch(err => console.log(err));

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
  if (!token || !searchArea) {
    throw new Error('Search could not be perform, missing search parameters and/or token');
  }
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

export const HYDRATE_SPECIE = async ({ commit, getters, dispatch }, specie) => {
  const {
    scientificNme: scientificName,
    commonNme: commonName,
    primaryCde: type,
    taxonId } = specie;

  console.log(`Hydrating ${commonName}`);
  // checking if taxonId has already been hydrated
  const taxonIdHydrated = getters.records.find(record => record.taxonId === taxonId);
  if (taxonIdHydrated) {
    return Promise.resolve();
  }

  if (!getters.accesToken) {
    await dispatch('FETCH_TOKEN');
  }
  if (!getters.searchArea) {
    await dispatch('GET_POSITION');
  }
  const token = getters.accesToken;
  const searchArea = getters.searchArea;
  if (!token || !searchArea) {
    throw new Error('Hydrating could not be perform, missing search parameters and/or token');
  }

  // fetching museum specie
  const taxonomy = { scientificName, commonName };
  // eslint-disable-next-line
  let specieData;
  // let herbariumData;
  // let museumData;
  // let alaData;

  if (type === 'Flora') {
    specieData = await searchHerbariumSpecies(taxonomy) ||
      await searchALASpecies(taxonomy) ||
      await searchMuseumSpecies(taxonomy);
  } else {
    specieData = await searchMuseumSpecies(taxonomy) ||
      await searchALASpecies(taxonomy) ||
      await searchHerbariumSpecies(taxonomy);
  }

  // console.log(specieData);
  return specieRecords(searchArea, taxonId, token)
    .then((records) => {
      console.log(`found ${records.length} obs for ${taxonId}`);
      commit('ADD_RECORDS', records);
    });
};
