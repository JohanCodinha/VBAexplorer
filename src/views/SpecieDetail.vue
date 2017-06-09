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
    <div class="content">
      <ul v-if="description || biology || distribution">
        <accordion
          :title="'Habitat'"
          :text="habitat"
          v-if="habitat"
          ></accordion>
        <accordion
          :title="'Biology'"
          :text="biology"
          v-if="biology"
          ></accordion>
        <accordion
          :title="'Distribution'"
          :text="distribution"
          v-if="distribution"
          ></accordion>
      </ul>
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
    </div>
  </div>
</template>

<script>
import imgSlider from '../components/imgSlider';
import recordListItem from '../components/recordListItem';
import accordion from '../components/accordion';

export default {
  name: 'hello',
  components: {
    imgSlider,
    record: recordListItem,
    accordion,
  },
  data () {
    const taxonId = parseInt(this.$route.params.taxonId, 10);
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

.content {
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
}

a {
  color: #42b983;
}
</style>
