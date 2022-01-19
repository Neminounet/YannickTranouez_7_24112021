<template>
  <Header/>
  <router-view/>
  <Footer/>
</template>

<script>
import { mapState } from 'vuex'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name:"App",
  components: {
    Header,
    Footer
  },
  computed: mapState([
    'isLogged'
  ]),
  methods: {
    connected(){
       if (localStorage.user !== undefined) {
      this.$store.dispatch("connectedUser");
      } else {
      this.$store.dispatch("notConnectedUser");
      }
    }
  },
  created() {
    this.connected();
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-areas: "header header"
                        "main main"
                        "footer footer";
  grid-template-rows: 2fr 7fr 1fr;
  grid-template-columns: 1fr;
}


body {
  box-sizing: border-box;
  margin: 0;
  /* display: flex; */
  /* flex-direction: column; */
  background-color: #d9f2e6;
  
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
