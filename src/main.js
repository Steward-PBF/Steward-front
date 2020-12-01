import Vue from 'vue';
import BaseIcon from '@/components/BaseIcon.vue';
import App from './App.vue';
import store from './store';
import router from './router';
import './plugins';

Vue.component('BaseIcon', BaseIcon);

const initiateVue = () => {
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
};

store.dispatch('getLoggedUser').finally(() => initiateVue());
