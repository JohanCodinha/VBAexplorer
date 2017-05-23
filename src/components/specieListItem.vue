<template>
  <li class="md-list-item"
    @click="$router.push({ name: 'SpecieDetail', params: { taxonId: taxonId } })">
    <div class="avatar">
      <img :src="thumbnail">
    </div>
    <div>
      <div>
        <div>
          <p>{{commonName}}</p>
          <p v-if="conservationStatus">{{conservationStatus}}</p>
        </div>
        <p>{{scientificName}}</p>
      </div>
    </div>
      <div>
        <p v-show="obs">{{ obs }} Observation{{obs > 1 ? 's':''}}<p>
        <p>Last from {{lastObs}}</p>
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
