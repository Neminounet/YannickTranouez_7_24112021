<template>
  <nav class="header">
    <div class="logo">
    </div>
    <div class="nav">
      <router-link to="/">
        <h3>Accueil</h3>
      </router-link>
      <router-link to="/profile">
        <h3>Profil</h3>
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.header {
  grid-area: header;
  background-color: #339966;
  padding: 30px 0;
  box-shadow: 0px 10px 13px -7px #000000;
}
.logo {
  width:40%;
  height: 60%;
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
    background-size: 100%;
  }
}

.nav {
  display: flex;
  justify-content: space-around;

}
a {
  color: white;
  text-decoration: none;
}
</style>
