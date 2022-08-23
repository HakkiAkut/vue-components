import axios from "axios";
const state = {
  users: [],
};
const getters = {
  getUsers: (state) => state.users,
};
const mutations = {
  setUsers: (state, user) => {
    state.users.push(user);
  },
};
const actions = {
  fetchUser: ({ commit }, email) => {
    const client = axios.create({
      baseURL: process.env.VUE_APP_RANDOM_USER_API_URL,
    });

    return client.get("").then((response) => {
      let user = {
        email: email,
        name: `${response.data.results[0].name.first} ${response.data.results[0].name.last}`,
        picture: response.data.results[0].picture.medium,
      };
      commit("setUsers", user);
      return user;
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
