<template>
  <nav class="header">
    <div class="logo">
    </div>
    <div class="nav">
      <router-link to="/" v-if="isLogged">
        <h3>Accueil</h3>
      </router-link>
      <router-link to="/profile" v-if="isLogged">
        <h3>Profil</h3>
      </router-link>
      <router-link to="/" v-if="isLogged" @click.prevent="logout()">
        <h3>Déconnexion</h3>
      </router-link>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Header',
  computed: mapState([
    'isLogged'
  ]),
  methods: {
    logout(){
      localStorage.removeItem("user");
      location.reload();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.header {
  grid-area: header;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 15vh;
  background-color: #339966;
  box-shadow: 0px 10px 13px -7px #000000;
}
.logo {
  width:40%;
  height: 80%;
  background-image: url("../assets/icon-left-font-monochrome-white.png");
  background-position: center;
  background-size: 40%;
  background-repeat: no-repeat;
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

.nav {
  display: flex;
  justify-content: center;
}

.nav h3 {
padding: 0 10px;
}

a {
  color: white;
  text-decoration: none;
}
</style>
