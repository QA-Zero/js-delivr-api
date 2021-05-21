import Vue from 'vue';
import Vuex from 'vuex';
import page from '@/store/currentPage';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { page },
});
