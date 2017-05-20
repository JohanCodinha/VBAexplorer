import Vue from 'vue';
import Router from 'vue-router';
import Homepage from '@/components/Homepage';
import Species from '@/components/Species';
import SpecieDetail from '@/components/SpecieDetail';

Vue.use(Router);

export default new Router({
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
