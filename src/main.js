import Vue from 'vue';
import axios from 'axios';
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import App from './App.vue';
import router from './router';
// import jspdf from 'jspdf';

// import "bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);

axios.defaults.baseURL =
	process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '/';

Vue.config.productionTip = false;

new Vue({
	router,
	render: (h) => h(App),
}).$mount('#app');
