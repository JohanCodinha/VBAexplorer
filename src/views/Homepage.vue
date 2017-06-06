<template>
  <div class="homepage-view">
    <div class="hero-image">
      <!-- <img src="../assets/Spiny-Rice-Flower.jpg"> -->
    </div>
    <div class="text-container">
      <h1>Bio scan</h1>
      <h2>Explore nearby recording of species.</h2>
        <div class="action">
          <button class="browse-button" :disabled="button.state" @click="browse">{{button.message}}</button>
        </div>
      <div class="text-intro">
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
      </div>
    </div>
<!--     <ul>
      <router-link to="/">Go home</router-link>
      <router-link to="/species">Go to Species</router-link>
    </ul> -->
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
          router.push({ name: 'Species' });
        }).catch((error) => {
          console.log(error.message);
          button.disabled = false;
          button.message = 'Browse';
        });
    },
  },
};
</script>

<style scoped>

.homepage-view {
}

.text-container {
  margin: 1rem;
}

.text-intro {
  /*margin-top: 1rem;*/
}

.action {
  display: flex;
  justify-content: center;
  margin: .8rem;
}

.hero-image {
  height: 15rem;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('../assets/Spiny-Rice-Flower.jpg')
}

.homepage-view h1 {
 font-size: 2.375rem;
}

.homepage-view .browse-button {
  min-height: 36px;
  margin: 6px 8px;
  padding: 0 16px;
  text-align: center;
  background-color: #00b2a9;
  border: 0;
  border-radius: 2px;
}

a {
  color: #42b983;
}

</style>
