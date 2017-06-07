<template>
  <div class="specie-detail">
  <div class="header">
    <div class="back-arrow">
    <router-link to="/species"><p>&larr;</p></router-link>
    </div>
    <div class="taxonomy">
      <h1>{{ commonName }}</h1>
      <h2>{{ scientificName }}</h2>
    </div>
  </div>
    <imgSlider v-if="images.length"
      :images="images"></imgSlider>
    <template v-if="description">
      <ul>
        <li v-if="description">
          <h3>Description :</h3>
          <p>{{description}}</p>
        </li>
        <li v-if="habitat">
          <h3>Habitat</h3>
          <p>{{habitat}}</p>
        </li>
        <li v-if="biology">
          <h3>Biology</h3>
          <p>{{biology}}</p>
        </li>
        <li v-if="distribution">
          <h3>Distribution</h3>
          <p>{{distribution}}</p>
        </li>
      </ul>
    </template>
    <h2>Records : </h2>
    <ul>
      <record v-for="record in records"
        :observerName="record.observerFullName"
        :method="record.samplingMethodCde"
        :startDate="record.surveyStartSdt"
        :count="record.totalCountInt"
        :accuracy="record.latLongAccuracyddNum"
        :projectId="record.projectId"
        :distance="record.distance">
      </record>
    </ul>
    <!-- {{ $data }}   -->
    </div>
</template>

<script>
import imgSlider from '../components/imgSlider';
import recordListItem from '../components/recordListItem';

export default {
  name: 'hello',
  components: {
    imgSlider,
    record: recordListItem,
  },
  data () {
    const taxonId = this.$route.params.taxonId;
    const specie = this.$store.getters.species.find(s => s.taxonId === taxonId);
    const specieData = this.$store.getters.speciesData.find(s => s.taxonId === taxonId);
    const records = this.$store.getters.records.filter(r => r.taxonId === taxonId);
    const { commonName, scientificName } = specie;
    const {
      generalDescription: description,
      images,
      biology,
      habitat,
      distribution,
    } = specieData;
    console.log(records);
    return {
      commonName,
      scientificName,
      description,
      biology,
      habitat,
      distribution,
      images,
      records,
    };
  },
  computed: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

h1 {
  font-size: 1.5rem;
}

.header {
  display: flex;
  margin: .5rem;
}

.back-arrow {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
}

.taxonomy {
  margin-left: .5rem;
}

.taxonomy p {
  overflow: auto;
  text-overflow: ellipsis;
}

h2 {
  font-size: 1.125rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
