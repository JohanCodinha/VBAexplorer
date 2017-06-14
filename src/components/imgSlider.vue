<template>
  <div>
    <div class="images">
      <div class="image-container">
        <transition name="fade">
          <img :src="currentImage.medium" :key="selectedImg">
        </transition>
      </div>
      <div v-show="images.length > 1" class="controls">
        <button @click="previous"
          :class="{hidden: (!this.selectedImg > 0)}"
          class="nav-button">
          <p>Prev</p>
        </button>
        <button @click="next"
          :class="{hidden: (this.selectedImg >= this.images.length - 1)}"
          class="nav-button">
          <p>Next</p>
        </button>
      </div>
    </div>
    <div class="credit" v-if="currentImage.creator || currentImage.source">
      <p>Author: {{ currentImage.creator || currentImage.source }}</p>
      <p>Source: {{ currentImage.source }}</p>
      <p>licence: {{ currentImage.licence || `© ${currentImage.creator || currentImage.source}`}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default () { return []; },
    },
  },
  data () {
    const data = {
      selectedImg: 0,
    };
    return data;
  },
  computed: {
    currentImage () {
      console.log(this.images[this.selectedImg]);
      return this.images[this.selectedImg];
    },
  },
  methods: {
    next () {
      if (this.selectedImg < this.images.length - 1) this.selectedImg += 1;
    },
    previous () {
      if (this.selectedImg > 0) this.selectedImg -= 1;
    },
  },
};
</script>

<style scoped>
.images {
  /*background-color: red;*/
  max-width: 100vw;
}

.image-container {
  /*background-color: blue;*/
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  height: 40vh;
}
.image-container img {
  height: auto;
  max-height: 100%;
  max-width: 100%;
}
.controls {
  display: flex;
  justify-content: space-around;
  margin: .5rem;
}

.nav-button {
  background-color: #42b983;
  border: none;
  height: 1.5rem;
  padding: 0 1rem 0 1rem;
  color: white;
  font-weight: bold;
}
.hidden {
  visibility: hidden;
}
.credit {
  margin: .5rem;
}

.fade-enter-active {
  transition: all 1s ease;
  /*overflow: hidden;*/
  visibility: visible;
  opacity: 1;
  /*height: 30vh;*/
}
.fade-enter{
  opacity: 0;
  visibility: hidden;
}
.fade-leave {
  /*display: none;*/
  visibility: hidden;
}

</style>
