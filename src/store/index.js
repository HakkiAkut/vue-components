import Vue from "vue";
import Vuex from "vuex";
import coins from "./modules/coin.js";
import users from "./modules/users.js";
import links from "./modules/links.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { coins, users, links },
});
