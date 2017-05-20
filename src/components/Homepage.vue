<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Welcome to Bio scan</h2>
    <p>Explore nearby recording of species. </p>
    <p>Specie's records are provided by the <a href="https://vba.dse.vic.gov.au/vba/">Victorian Biodiversity Atlas</a>.
    Biodiversity knowledge is comming from : </p>
    <ul>
      <li><a href="https://museumvictoria.com.au">Museums Victoria</a></li>
      <li><a href="https://www.ala.org.au/">Atlas of Living Australia</a></li>
      <li><a href="https://www.rbg.vic.gov.au/">Royal Botanic Gardens Victoria</a></li>
    </ul>
    <p>
      This is a <a href="https://www.delwp.vic.gov.au">DELWP</a> and <a href="www.codeforaustralia.org/">Code for Australia</a> project.
    </p>
    <button @click="browse" >Browse</button>
    <ul>
      <router-link to="/">Go home</router-link>
      <router-link to="/species">Go to Species</router-link>
      <router-link to="/species/12334">Go to Specie 12334</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'homepage',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  methods: {
    browse () {
      this.$store.dispatch('getPosition')
        .then(() => this.$store.dispatch('searchSpecies'))
        .then((speciesCount) => {
          console.log(`found ${speciesCount} species`);
        })
        .catch(error => console.log(error));
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
