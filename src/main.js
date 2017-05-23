// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';
import store from './store';

Vue.use(Vuex);
Vue.config.productionTip = false;

// function resolveAfter2Seconds (x) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(x);
//     }, 2000);
//   });
// }

// async function add1 (x) {
//   const a = resolveAfter2Seconds(20);
//   const b = resolveAfter2Seconds(30);
//   return alert(x + await a + await b);
// }

// add1(10).then((v) => {
//   console.log(v);  // prints 60 after 2 seconds.
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});
