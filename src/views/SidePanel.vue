<template>
  <div class="slideout-menu">
    <div class="content">
      <h1>Settings</h1>
      <h2>Position :</h2>
      <div class="content-text">
        <label>Latitude <input type="number" :value="latitude" placeholder="unknown"></label>
        <label>Longitude <input type="number" :value="longitude" placeholder="unknown"></label>
      </div>
      <!-- <h2>Search radius :</h2> -->
      <label for="selectRadius"><h2>Search radius :</h2></label>
      <div class="select-wrapper content-text">
        <select name="selectRadius" v-model="searchRadius">
          <option v-for="option in radiusOptions"
            :value="option.value">{{ option.text }}</option>
        </select>
      </div>
      <h2>Stats : </h2>
      <div class="stats content-text">
        <p>{{ speciesCount }} species found</p>
      </div>
    </div>
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
        this.$store.dispatch('SEARCH_SPECIES')
          .then(e => console.log(e));
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

<style scoped>
.slideout-menu {
  -webkit-overflow-scrolling: touch;
  bottom: 0;
  left: auto;
  overflow-y: auto;
  position: fixed;
  right: 0;
  top: 0;
  width: 268px;
  z-index: 0;
}

.content { 
  padding: 1rem;
}

h1 {
  font-size: 1.5rem;
  margin: .5rem;
}

h2 {
  font-size: 1.125rem;
  margin: .25rem;
}

.slideout-menu::before {
  background: #00b7bd;
  content: '';
  display: block;
  height: 3.125rem;
  width: 100%;
}

.content-text {
  margin-left: .5rem;
}

select {
  appearance: none;
  border-radius: 0;
  font-family: inherit;
  background-color: transparent;
  padding: 0;
  border: none;
  border-bottom: 1px solid #42b983;
}

.select-wrapper::after {
  content: '▾';
  color: #42b983;
  display: inline-block;
  margin-left: .5rem;
  pointer-events: none;
}

</style>
