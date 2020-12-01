import Vue from 'vue';
import axios from 'axios';
import Vuelidate from 'vuelidate';

axios.defaults.baseURL = 'http://localhost:8081';
axios.defaults.withCredentials = true;
Object.defineProperties(Vue.prototype, {
  $http: {
    get() {
      return axios;
    },
  },
});
Vue.http = axios;
Vue.use(Vuelidate);
