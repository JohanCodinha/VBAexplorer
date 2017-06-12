<template>
  <li class="accordion-item">
    <a @click="toggle" :class="{'title-active': toggled}" class="title">{{title}} :</a>
    <p :class="{'toggle-content': toggled, content: !toggled}">{{text}}</p>
  </li>
</template>

<script>
export default {
  name: 'accordion-item',
  props: {
    title: {
      type: String,
      default () { return 'expand accordion'; },
    },
    text: {
      type: String,
      default () { return 'accordion text body'; },
    },
  },
  data () {
    const data = {
      toggled: false,
    };
    return data;
  },
  methods: {
    toggle () {
      this.toggled = !this.toggled;
      console.log(this.toggled);
    },
  },
};
</script>

<style scoped>
.accordion-item {
  width: 100%;
}

.toggle-content {
  max-height: inherit;
  opacity: 1;
  padding: 1.25rem;
  visibility: visible;
}

.content {
  max-height: 0;
  opacity: 0;
  padding: 0 1.25rem;
  visibility: hidden;
  overflow: auto;
}

.title {
  color: #201547;
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 1.0625rem 3.125rem 1.0625rem 1.25rem;
  text-decoration: none;
  background-color: rgba(188, 184, 199, 0.16);
  position: relative;
}

.title::after {
  content: '>';
  height: 1rem;
  position: absolute;
  right: 2.5625rem;
  top: 50%;
  width: 1rem;
  transition: transform 0.35s ease;
  transform: translateY(-50%) rotate(90deg);
}

.title-active::after {
  transform: translateY(-100%) rotate(-90deg);
}

.title-active {
  background-color: #00b7bd;
  color: #fff;
}
</style>
