<template>
  <div class="hello">
    <h1>{{ taxonId }}</h1>
    <ul>
      <li v-for="record in records">{{record.observerFullName}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Species page',
    };
  },
  computed: {
    taxonId () {
      return this.$route.params.taxonId;
    },
    records () {
      const taxonId = this.taxonId;
      return this.$store.getters.records.filter(record => record.taxonId === taxonId);
    },
  },
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

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
