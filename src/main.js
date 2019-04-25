import Vue from 'vue';
import App from './App.vue';
import store from './store';
import moment from 'vue-moment';

Vue.use(moment);

Vue.config.productionTip = false;

new Vue({
	store,
	render: h => h(App)
}).$mount('#app');
