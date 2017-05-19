import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as actions from './actions';
import * as mutations from './mutations';

Vue.use(Vuex);

const state = {
  records: [/* sightening records from the VBA */],
  species: [/* species found at locations */],
  speciesData: {/* [id: number]: Data */},
  searchRadius: 250, /* in Meters */
};

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
});
