import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		proxies: [],
		countries: [],
		loading: false,
		filters: { alive: true, proxyType: [], country: 'all' }
	},
	mutations: {
		/**
		 * Set status of request
		 */
		setStatus: (state, loading) => {
			state.loading = loading;
		},
		/**
		 * Set data from response
		 */
		setData: (state, { proxies, countries }) => {
			state.proxies = proxies;
			state.countries = countries;
		},
		/**
		 * Set filters from settings
		 */
		setFilters: (state, filters) => {
			Vue.use(state, 'filters', filters);
			state.filters = filters;
		}
	},
	actions: {
		/**
		 * Requesting proxies data
		 */
		fetchData: async ({ commit }) => {
			try {
				commit('setStatus', true);
				const response = await axios.get('/proxies');
				const countries = [];
				response.data.forEach(proxy => {
					countries.push(proxy.country);
				});
				commit('setData', { proxies: response.data, countries: [...new Set(countries)] });
			} catch (err) {
				throw new Error(err);
			}
			commit('setStatus', false);
		},
		changeFilters: ({ commit }, filters) => {
			commit('setFilters', filters);
		}
	},
	getters: {
		proxies: state => state.proxies,
		countries: state => state.countries,
		loading: state => state.loading,
		filters: state => state.filters
	}
});
