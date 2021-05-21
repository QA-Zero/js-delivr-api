import Vue from 'vue'
import store from './store';
import Api from './api/index';
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import initializer from './helpers/initializer';

Vue.use(Api, { store });
Vue.config.productionTip = false;

initializer({ store });

new Vue({
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
