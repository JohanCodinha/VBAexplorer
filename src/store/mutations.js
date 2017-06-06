import Vue from 'vue';
import * as types from './mutation-types';

export default {
  [types.SET_TOKEN] (state, token) {
    const timestamp = Date.now();
    Vue.set(state, 'token', {
      value: token,
      timestamp,
    });
  },
  [types.SET_POSITION] (state, { latitude, longitude, accuracy }) {
    const timestamp = Date.now();
    Vue.set(state, 'position', { latitude, longitude, accuracy, timestamp });
  },
  [types.SET_SEARCH_RADIUS] (state, radius) {
    Vue.set(state, 'searchRadius', radius);
  },
  [types.ADD_SPECIE] (state, specie) {
    const specieInStoreIndex = state.species.findIndex(s => s.taxonId === specie.taxonId);
    if (specieInStoreIndex > -1) {
      console.log(`replacing ${state.species[specieInStoreIndex].scientificName} from store`);
      state.species.splice(specieInStoreIndex, 1, specie);
      Vue.set(state, 'species', [...state.species]);
    } else {
      Vue.set(state, 'species', [...state.species, specie]);
    }
  },
  [types.ADD_RECORDS] (state, records) {
    Vue.set(state, 'records', [...state.records, ...records]);
  },
  [types.ADD_SPECIE_DATA] (state, specieData) {
    Vue.set(state, 'speciesData', [...state.speciesData, specieData]);
  },
};
