<template>
    <div class="profile">
        <Connexion v-if="!isLogged" />
        <ProfilEdit v-else />
    </div>
</template>

<script>
import { mapState } from "vuex";
import Connexion from "../components/Connexion.vue";
import ProfilEdit from "../components/ProfilEdit.vue";


export default {
    name: "Post",
    components: {
    Connexion,
    ProfilEdit
  },
  computed: mapState([
    "isLogged"
  ])
}
</script>

<style scoped>

</style>