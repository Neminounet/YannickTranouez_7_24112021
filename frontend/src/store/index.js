import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogged: false,
    newUser: {
      username: '',
      password: '',
      cPassword: '',
      email: '',
      image: ''
    }
  },
  mutations: {
    // loginUser(state) {
    //   state.isLogged = true;
    // }
  },
  actions: {
    // loginUser({ commit }){
    //   commit('loginUser')
    // }
  },
  modules: {
  }
})
