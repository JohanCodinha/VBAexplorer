<template>
  <div id="app">
  <div class="main slideLeft" 
    :style="{ transform: slideoutOpen ? 'translateX(-268px)' : 'translateX(0px)' }">
    <header>
      <div class="container">
        <img src="./assets/logo-delwp.png">
        <p @click="menu" style="color: white">M</p>
      </div>
    </header>
    <router-view></router-view>
  </div>
  <sidePanel :style="{ display: slideoutOpen ? 'block' : 'none' }"></sidePanel>
  </div>
</template>

<script>
import sidePanel from './views/SidePanel';

export default {
  name: 'app',
  data () {
    return {
      slideoutOpen: false,
    };
  },
  components: {
    sidePanel,
  },
  methods: {
    menu () {
      this.slideoutOpen = !this.slideoutOpen;
    },
  },
};
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
header {
  background-color: #201647;
  padding: 0.5rem 0;
}

.slideLeft {
  transition: transform 300ms ease;
}

.displayMenu {
  display: block;
}

.container {
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  justify-content: space-between;
}
header img {
  height: 2.125rem;
}
.main {
  position: relative;
  z-index: 1;
  /*transform: translateX(-268px);*/
}
</style>
