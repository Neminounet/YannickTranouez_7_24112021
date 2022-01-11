<template>
  <div class="home">
    <Connexion v-if="!isLogged" />
    <Main v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Connexion from '../components/Connexion.vue'
import Main from '../components/Main.vue'


export default {
  name: 'Home',
  components: {
    Connexion,
    Main
  },
  computed: mapState ([
    'isLogged'
  ])
}
</script>

<style  scoped>

</style>


