<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li v-for="specie in species">
        <p>{{specie.commonNme}}</p>
      </li>
    </ul>
      <router-link to="/">Go home</router-link>
      <router-link to="/species">Go to Species</router-link>
      <router-link to="/species/12334">Go to Specie 12334</router-link>
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
    species () {
      return this.$store.getters.species;
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
