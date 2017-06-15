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
        console.log(`response body : ${token.slice(5)}...`);
        commit('SET_TOKEN', token);
        return resolve(token);
      });
  }).catch(err => console.log(err));

export const GET_POSITION = ({ commit }) => {
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

function convertConservation (status) {
  if (!status) return null;
  const threatenedRegex = [
    /L/,
    /P\s*L/,
    /cr/,
    /cr\s*dbt/,
    /cr\s*L/,
    /dd\s*L/,
    /en\s*/,
    /en\s*I/,
    /en\s*L/,
    /en\s*L\s*#/,
    /ex\s*L/,
    /k\s*\*/,
    /k\s*L/,
    /nt\s*L/,
    /r/,
    /r\s*#/,
    /r\s*D/,
    /r\s*L/,
    /r\s*N/,
    /r\s*X/,
    /rx\s*L/,
    /vu\s*/,
    /vu\s*#/,
    /vu\s*D/,
    /vu\s*L/,
    /vu\s*X/,
    /CR\s*cr\s*L/,
    /CR\s*dd\s*L/,
  ];

  const str = status.trim();
  if (str === '*') return 'Not native';
  const isThreatened = threatenedRegex.some(regex => str.search(regex) !== -1);
  if (isThreatened) return 'Threatened';
  return null;
}

function reshapeSpecie (specie) {
  const template = {
    conservationStatus: convertConservation(specie.conservationStatus),
    count: specie.countOfSightings,
    commonNameSynonym: specie.commonNmeSynonym,
    commonName: specie.commonNme,
    lastRecord: specie.lastRecord,
    taxonId: specie.taxonId,
    // originCategoryCde:"*"
    // parentTaxonId:41055
    scientificName: specie.scientificNme,
    biota: specie.primaryCde,
    scientificNameSynonym: specie.scientificNmeSynonym,
    shortName: specie.shortName,
    scientificDisplayName: specie.scientificDisplayNme,
    // taxonLevelCde:"spec"
    // taxonTypeCde:"mono"
  };
  return template;
}

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
        return new Error('No species found at location');
      }
      species.forEach((specie) => {
        if (Object.prototype.hasOwnProperty.call(specie, 'countOfSightings') && specie.countOfSightings > 0) {
          const shapedSpecie = reshapeSpecie(specie);
          commit(types.ADD_SPECIE, shapedSpecie);
        }
      });
      return species.length;
    })
    .catch(error => console.log(error));
};

export const HYDRATE_SPECIE = async ({ commit, getters, dispatch }, specie) => {
  const {
    scientificName,
    commonName,
    biota,
    taxonId } = specie;
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
  // fetch specie records in parallel
  const fetchRecords = specieRecords(searchArea, taxonId, token);
  const taxonomy = { scientificName, commonName };
  let specieData;
  // If specie is flora, look first at the herbarium.
  if (biota === 'Flora') {
    specieData = await searchHerbariumSpecies(taxonomy) ||
      await searchALASpecies(taxonomy) ||
      await searchMuseumSpecies(taxonomy) ||
      { images: [] };
  } else {
    specieData = await searchMuseumSpecies(taxonomy) ||
      await searchALASpecies(taxonomy) ||
      await searchHerbariumSpecies(taxonomy) ||
      { images: [] };
  }
  // add taxonId to specieData
  specieData.taxonId = taxonId;

  commit('ADD_SPECIE_DATA', specieData);
  const records = await fetchRecords;
  commit('ADD_RECORDS', records);

  console.log(`Hydrating ${commonName} :
    records found ${records.length}.
    Data found : ${!!specieData}`);
  return Promise.resolve();
};
