import Vue from 'vue';
import Router from 'vue-router';
import Homepage from '@/views/Homepage';
import Species from '@/views/Species';
import SpecieDetail from '@/views/SpecieDetail';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage,
    },
    {
      path: '/species',
      name: 'Species',
      component: Species,
    },
    {
      path: '/species/:taxonId',
      name: 'SpecieDetail',
      component: SpecieDetail,
    },
  ],
});

// /search
// /species/:taxonID
//
