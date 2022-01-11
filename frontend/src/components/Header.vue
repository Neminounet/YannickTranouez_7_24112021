<template>
  <nav class="header">
    <div class="logo">
    </div>
    <!-- <div class="nav">
      <router-link to="/" v-if="isLogged">
        <h3>Accueil</h3>
      </router-link>
      <router-link to="/profile">
        <h3>Postez un message</h3>
      </router-link>
      <router-link to="/profile">
        <h3>Profil</h3>
      </router-link>
    </div> -->
  </nav>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Header',
  computed: mapState([
    'isLogged'
  ])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.header {
  grid-area: header;
  height: 10vh;
  background-color: #339966;
  /* padding: 40px 0; */
  box-shadow: 0px 10px 13px -7px #000000;
}
.logo {
  width:40%;
  height: 80%;
  background-image: url("../assets/icon-left-font-monochrome-white.png");
  background-position: center;
  background-size: 40%;
  background-repeat: no-repeat;
  margin: auto;
}

@media (max-width: 991.98px) {
  .header {
    width: 100%;
  }
  .logo {
    width: 60%;
    background-size: 100%;
  }
  h3 {
    font-size: 1em;
  }
}

/* .nav {
  display: flex;
  justify-content: space-around;

} */
a {
  color: white;
  text-decoration: none;
}
</style>
