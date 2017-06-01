<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <template v-for="specie in paginated">      
        <specieListItem
          :commonName="specie.commonNme"
          :conservationStatus="specie.conservationStatus"
          :scientificName="specie.scientificDisplayNme"
          :taxonId="specie.taxonId"
          :lastRecord="specie.lastRecord"
          :observationsCount="specie.countOfSightings"
          :key="specie.scientificDisplayNme">
        </specieListItem>
      </template>
    </ul>
    <ul class="pagination">
      <li v-for="pageNumber in totalPages" v-if="Math.abs(pageNumber - currentPage) < 2 || pageNumber == totalPages || pageNumber == 1">
        <button href="#" @click="setPage(pageNumber)"  :class="{current: currentPage === pageNumber, last: (pageNumber == totalPages && Math.abs(pageNumber - currentPage) > 2), first:(pageNumber == 1 && Math.abs(pageNumber - currentPage) > 2)}">{{ pageNumber }}</button>
      </li>
    </ul>
      <router-link to="/">Go home</router-link>
      <router-link to="/species">Go to Species</router-link>
      <router-link to="/species/12334">Go to Specie 12334</router-link>
  </div>
</template>

<script>
import specieListItem from '../components/specieListItem';

export default {
  name: 'hello',
  components: {
    specieListItem,
  },
  data () {
    return {
      msg: 'Species page',
      currentPage: 1,
      itemsPerPage: 8,
    };
  },
  computed: {
    species () {
      return this.$store.getters.species;
    },
    paginated () {
      return this.paginate(this.species);
    },
    totalPages () {
      return Math.ceil(this.species.length / this.itemsPerPage);
    },
  },
  methods: {
    paginate (list) {
      const sliceIndex = (this.currentPage - 1) * this.itemsPerPage;
      const paginatedList = list.slice(sliceIndex, sliceIndex + this.itemsPerPage);
      return paginatedList;
    },
    setPage (pageNumber) {
      this.currentPage = pageNumber;
    },
    hydrate (species) {
      species.forEach((specie) => {
        this.$store.dispatch('HYDRATE_SPECIE', specie);
      });
    },
  },
  watch: {
    paginated: function paginationEvent (speciesOnDisplay) { this.hydrate(speciesOnDisplay); },
  },
  mounted: function mountedEvent () { this.hydrate(this.paginated); },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

.pagination {
  display: flex;
  justify-content: center;
}

.pagination li {
  margin-left: .5rem;
}

a {
  color: #42b983;
}
</style>
