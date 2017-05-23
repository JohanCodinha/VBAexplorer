<template>
  <div>
    <p>Position :</p>
    <label>Latitude <input type="number" :value="latitude" placeholder="unknown"></label>
    <label>Longitude <input type="number" :value="longitude" placeholder="unknown"></label>
    <p>Search radius :</p>
    <label for="selectRadius">Radius in meter</label>
    <select name="selectRadius" v-model="searchRadius">
      <option v-for="option in radiusOptions"
        :value="option.value">{{ option.text }}</option>
    </select>
    <p>{{speciesCount}} species found</p>
  </div>
</template>

<script>
export default {
  name: 'sidePanel',
  data () {
    return {
      radiusOptions: [
        { text: '50 meters', value: 50 },
        { text: '100 meters', value: 100 },
        { text: '150 meters', value: 150 },
        { text: '200 meters', value: 200 },
        { text: '250 meters', value: 250 },
        { text: '500 meters', value: 500 },
      ],
    };
  },
  computed: {
    speciesCount () {
      return this.$store.getters.species.length;
    },
    searchRadius: {
      get () { return this.$store.getters.searchRadius; },
      set (value) {
        this.$store.commit('SET_SEARCH_RADIUS', value);
      },
    },
    latitude () {
      return this.$store.getters.searchArea.lat;
    },
    longitude () {
      return this.$store.getters.searchArea.long;
    },
  },
};
</script>
