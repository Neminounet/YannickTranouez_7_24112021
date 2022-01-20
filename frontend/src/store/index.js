import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogged: false,
    currentUser: JSON.parse(localStorage.getItem("connectedUser"))
  },
  mutations: {
    // 1) Connection de l'utilisateur
    connectedUser(state) {
      state.isLogged = true;
    },
    notConnectedUser(state) {
      state.isLogged = false;
    }
  },
  actions: {
    // 1) Connection de l'utilisateur
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
