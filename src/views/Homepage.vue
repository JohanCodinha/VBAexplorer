<template>
  <div class="hello">
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
    <button :disabled="button.state" @click="browse">{{button.message}}</button>
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
      button: {
        message: 'Browse',
        disabled: false,
      },
    };
  },
  methods: {
    browse () {
      const router = this.$router;
      const button = this.button;
      button.disabled = true;
      button.message = 'Searching species';
      this.$store.dispatch('SEARCH_SPECIES')
        .then((speciesCount) => {
          console.log(`found ${speciesCount} species`);
          router.push('Species');
        });
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
