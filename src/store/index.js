import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		id: null,
		pw: null,
		isLogin: false,
		response: {}
	},
	mutations: {
		setAuthState(store, {id, pw, isLogin, response}) {
			store.id = id;
			store.pw = pw;
			store.isLogin = isLogin;
			store.response = response;
		}
	},
	actions: {
		async login({commit}, {id, pw}) {
			let loginRes;
			try {
				loginRes = (await axios.post("https://group.dnhs.me/api/admin", {
					id: id,
					pw: pw
				}, {
					responseType: "json"
				})).data;
			} catch (e) {
				loginRes = e.response.data;
			} finally {
				commit('setAuthState', {id: id, pw: pw, isLogin: loginRes.status === 0, response: loginRes.result});
			}
		}
	},
	getters: {
		credentials(state) {
			return {id: state.id, pw: state.pw};
		},
		isLogin(state) {
			return state.isLogin;
		},
		data(state) {
			return state.response;
		}
	},
	modules: {}
});
