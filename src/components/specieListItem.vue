<template>
  <li class="specie-li"
    @click="$router.push({ name: 'SpecieDetail', params: { taxonId: taxonId } })">
    <div class="avatar">
      <img :src="thumbnail">
    </div>
    <div class="text-container">
      <div class="toxonomy">
        <p>{{commonName}}</p>
        <p v-if="conservationStatus">{{conservationStatus}}</p>
        <p>{{scientificName}}</p>
      </div>
      <div class="observation">
        <p v-show="obs">{{ obs }} Observation{{obs > 1 ? 's':''}}<p>
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
    thumbnail: {
      type: String,
      default () {
        return 'https://raw.githubusercontent.com/Ranks/emojione/2.2.7/assets/png_128x128/1f43e.png';
      },
    },
  },
  methods: {
  },
  computed: {
    obs () {
      const id = this.taxonId;
      const obs = this.$store.getters.records.filter(record => record.taxonId === id);
      return obs.length;
    },
    lastObs () {
      const lastRecord = this.lastRecord;
      return new Date(lastRecord).getFullYear();
    },
  },
};
</script>

<style scoped>
.specie-li {
  display: flex;
  align-items: center;
}

.text-container {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
}

.avatar img {
  object-fit: cover;
  width: 100%;
}

</style>
