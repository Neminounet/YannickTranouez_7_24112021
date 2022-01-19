<template>
  <div class="home">
    <Connexion v-if="!isLogged" />
    <Main v-else/>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Connexion from "../components/Connexion.vue";
import Main from "../components/Main.vue";

export default {
  name: "Home",
  components: {
    Connexion,
    Main,
  },
  computed: mapState([
    "isLogged",
    "currentUser",
  ]),
  // methods: {
  //   connected(){
  //      if (localStorage.user !== undefined) {
  //     console.log("ouiii")
  //     this.$store.dispatch("connectedUser");
  //     } else {
  //     console.log("nooonnn")
  //     this.$store.dispatch("notConnectedUser");
  //     }
  //   }
  // },
  // created() {
  //  this.connected();
  // }
};
</script>

<style  scoped>
</style>


