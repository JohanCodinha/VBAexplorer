<template>
  <div class="hello">
    <div class="filter">
      <p>Sort by :</p>
      <select name="filter" v-model="selectedFilter">
        <option v-for="filter in filters"
          :value="filter.value">{{ filter.text }}</option>
      </select>
    </div>
    <ul>
      <!-- <template v-for="specie in paginated">       -->
      <specieListItem v-for="specie in paginated" class="specie-li"
        :commonName="specie.commonName"
        :conservationStatus="specie.conservationStatus"
        :scientificName="specie.scientificDisplayName"
        :taxonId="specie.taxonId"
        :lastRecord="specie.lastRecord"
        :observationsCount="specie.count"
        :key="specie.scientificDisplayNme">
      </specieListItem>
      <!-- </template> -->
    </ul>
    <ul class="pagination">
      <li v-for="pageNumber in totalPages" v-if="Math.abs(pageNumber - currentPage) < 2 || pageNumber == totalPages || pageNumber == 1">
        <button href="#" @click="setPage(pageNumber)"  :class="{current: currentPage === pageNumber, last: (pageNumber == totalPages && Math.abs(pageNumber - currentPage) > 2), first:(pageNumber == 1 && Math.abs(pageNumber - currentPage) > 2)}">{{ pageNumber }}</button>
      </li>
    </ul>
      <!-- <router-link to="/">Go home</router-link> -->
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
      filters: [
        { text: 'Common name', value: 'commonName' },
        { text: 'Scientific name', value: 'scientificName' },
        { text: 'Flora', value: 'flora' },
        { text: 'Fauna', value: 'fauna' },
        { text: 'Date', value: 'date' },
        // { text: 'Distance', value: 'distance' },
      ],
      selectedFilter: 'commonName',
      currentPage: 1,
      itemsPerPage: 8,
    };
  },
  computed: {
    // filter: {
    //   get () { return this.selectedFilter; },
    //   set (value) {
    //     this.$store.commit('SET_SEARCH_RADIUS', value);
    //   },
    // },
    species () {
      return this.$store.getters.species;
    },
    paginated () {
      const filtered = this.filter(this.species);
      return this.paginate(filtered);
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
    filter (list) {
      switch (this.selectedFilter) {
        case 'commonName':
          return this.byCommonName(list);
        case 'scientificName':
          return this.byScientificName(list);
        case 'distance':
          return this.byDistance(list);
        case 'flora':
          return this.byFlora(list);
        case 'fauna':
          return this.byFauna(list);
        case 'date':
          return this.byDate(list);
        default:
          return this.byCommonName(list);
      }
    },

    byCommonName (list) {
      const filteredSpecies = list.sort((a, b) => {
        const nameA = a.commonName.toLowerCase();
        const nameB = b.commonName.toLowerCase();
        if (nameA < nameB) return -1; // sort string ascending
        if (nameA > nameB) return 1;
        return 0; // default return value (no sorting)
      });
      return filteredSpecies;
    },

    byScientificName (list) {
      const filteredSpecies = list.sort((a, b) => {
        const nameA = a.scientificDisplayName.toLowerCase();
        const nameB = b.scientificDisplayName.toLowerCase();
        if (nameA < nameB) return -1; // sort string ascending
        if (nameA > nameB) return 1;
        return 0; // default return value (no sorting)
      });
      return filteredSpecies || [];
    },

    byFlora (list) {
      return list.filter(specie => specie.biota === 'Flora');
    },

    byFauna (list) {
      // everything but flora
      return list.filter(specie => specie.biota !== 'Flora');
    },

    byDate (list) {
      const filteredSpecies = list.sort((a, b) => a.lastRecord - b.lastRecord);
      return filteredSpecies;
    },

    // byDistance (list) {
    //   const speciesWithClosestRecord = list.map((specie) => {
    //     const taxonId = specie.taxonId;
    //     const records = this.$store.getters.records.filter(record => record.taxonId === taxonId);
    //     const closestRecord = records.sort((a, b) => a.distance - b.distance)[0];
    //     return Object.assign({}, specie, { closestRecordDistance: closestRecord.distance });
    //   });
    //   return speciesWithClosestRecord
    //     .sort((a, b) => a.closestRecordDistance - b.closestRecordDistance);
    // },
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
  padding: 1rem;
}

.pagination li {
  margin-left: .5rem;
}

a {
  color: #42b983;
}
.filter {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: .3rem;
}

.filter select {
  font-family: inherit;
  background-color: transparent;
  padding: 0;
  border: none;
  border-bottom: 1px solid #42b983;
}

.specie-li:nth-child(even) {
  background-color: #f7f7f7;
}
</style>
