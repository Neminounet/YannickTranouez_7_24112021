import { createStore } from 'vuex'
// import axios from "axios"


export default createStore({
  state: {
    isLogged: false,
    isAdmin: false,
    messages: JSON.parse(localStorage.getItem("messages")),
    currentUser: JSON.parse(localStorage.getItem("user"))
  },
  mutations: {
    connectedUser(state) {
      state.isLogged = true;
    },
    notConnectedUser(state) {
      state.isLogged = false;
    }
  },
  actions: {
    connectedUser({ commit }){
      commit('connectedUser')
    },
    notConnectedUser({ commit }) {
      commit('notConnectedUser')
    }
  },
  modules: {
  }
})
