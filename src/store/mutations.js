import Vue from 'vue';
import * as types from './mutations-types';

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
  [types.SET_SEARCH_RADIUS] (state, radiusInMeter) {
    Vue.set(state, 'radiusInMeter', radiusInMeter);
  },
  [types.ADD_SPECIE] () {},
  [types.ADD_RECORD] (state, record) {
    Vue.set(state, 'records', [...state.records, record]);
  },
  [types.HYDRATE_SPECIE] () {},
};
