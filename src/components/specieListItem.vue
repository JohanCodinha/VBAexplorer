<template>
  <li class="specie-li"
    @click="$router.push({ name: 'SpecieDetail', params: { taxonId: taxonId } })">
    <div class="avatar">
      <img :src="thumbnail">
    </div>
    <div class="text-container">
      <div class="taxonomy">
      <div class="top-row">
        <p>{{commonName}}</p>
        <p v-if="conservationStatus" class="status">{{conservationStatus}}</p>
      </div>
        <p>{{scientificName}}</p>
      </div>
      <div class="observation">
        <p v-show="observationsCount">{{ observationsCount }} Observation{{observationsCount > 1 ? 's':''}}<p>
        <p>Last from {{lastObs}}</p>
      </div>
    </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    commonName: {
      type: String,
      default () { return ''; },
    },
    conservationStatus: {
      type: String,
      default () { return false; },
    },
    scientificName: {
      type: String,
      default () { return ''; },
    },
    taxonId: {
      type: Number,
      default () { return undefined; },
    },
    lastRecord: {
      type: Number,
      default () { return undefined; },
    },
    observationsCount: {
      type: Number,
      default () { return undefined; },
    },
  },
  methods: {
  },
  computed: {
    // obs () {
    //   if (Object.prototype.hasOwnProperty.call(specie, 'records')) {
    //   }
    //   return obs.length;
    // },
    lastObs () {
      const lastRecord = this.lastRecord;
      return new Date(lastRecord).getFullYear();
    },
    thumbnail () {
      const specieData = this.$store.getters.speciesData.find(s => s.taxonId === this.taxonId);
      const defaultThumbnail = 'https://raw.githubusercontent.com/Ranks/emojione/2.2.7/assets/png_128x128/1f43e.png';
      if (!(specieData && specieData.images.length)) return defaultThumbnail;
      const thumbnail = specieData.images[0].thumbnail;
      return thumbnail || defaultThumbnail;
    },
  },
};
</script>

<style scoped>
.specie-li {
  display: flex;
  align-items: center;
  height: 20vh;
  padding-top: .5rem;
  padding-left: .5rem;
  padding-right: .5rem;
}

.text-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  height: 100%;
}

.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 25vw;
  height: 100%;
  max-height: 100%;
  margin-right: .5rem;
}

.avatar img {
  width: 100%;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  mix-blend-mode: multiply;
}

.taxonomy {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.top-row {
  display: flex;
  justify-content: space-between;
}

.observation {
  display: flex;
  justify-content: space-between;
  /*flex-direction: column;*/
}

.status {
  background-color: #cedc00;
  padding: 0 5px 0 5px;
  border-radius: 5px;
  /*max-height: 1rem;*/
}

</style>
