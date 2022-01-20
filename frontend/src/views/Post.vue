<template>
    <div class="post">
        <Connexion v-if="!isLogged" />
        <OnePost v-else />
    </div>
</template>

<script>
import { mapState } from "vuex";
import Connexion from "../components/Connexion.vue";
import OnePost from "../components/OnePost.vue";


export default {
    name: "Post",
    components: {
    OnePost,
    Connexion,
  },
  computed: mapState([
    "isLogged"
  ])
}
</script>

<style>
.post {
    width: 100vw;
}
</style>