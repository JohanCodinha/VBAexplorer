import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
  records: [/* sightening records from the VBA */],
  species: [/* species found at locations */],
  speciesData: {/* [id: number]: Data */},
  searchRadius: 250, /* in Meters */
  position: null, /* {latitude, longitude, accuracy, timestamp} */
  token: null /* jwt token to acces the VBA API */,
};

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
});
export default store;
