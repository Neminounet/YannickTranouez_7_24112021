<template>
  <div class="connect">
    <section>
      <h1>Connectez-vous à Groupomania</h1>
      <div class="connectWin">
        <div class="signup">
          <h2>Inscrivez-vous</h2>
          <form>
            <label for="fname">Nom d'utilisateur :</label><br />
            <input
              type="text"
              id="fname"
              name="fname"
              placeholder="5 caractères minimum"
              v-model="newUser.username"
              required="required"
            /><br />

            <label for="fpass">Mot de Passe :</label><br />
            <input
              type="password"
              id="fpass"
              name="fpass"
              placeholder="5 caractères minimum"
              v-model="newUser.password"
              required="required"
            /><br />

            <label for="fcpass">Confirmer Mot de Passe :</label><br />
            <input
              type="password"
              id="fcpass"
              name="fcpass"
              placeholder="5 caractères minimum"
              v-model="newUser.cPassword"
              required="required"
            /><br />

            <label for="femail">Adresse Email :</label><br />
            <input
              type="email"
              id="femail"
              name="femail"
              placeholder="Adresse correcte"
              v-model="newUser.email"
              required="required"
            /><br />

            <label for="favatar">Photo de profil (Facultatif) :</label><br />
            <input
              type="file"
              id="favatar"
              name="favatar"
              @change="fileSelected"
            /><br />

            <button @click.prevent="createUser()">S'inscrire</button>
          </form>
        </div>
        <div class="separation"></div>
        <div class="login">
          <h2>Déjà inscrit ?</h2>
          <form>
            <label for="lemail">Adresse Email :</label><br />
            <input type="email" id="lemail" name="lemail" v-model="user.email" required="required" /><br />

            <label for="lpass">Mot de Passe :</label><br />
            <input type="password" id="lpass" name="lpass" v-model="user.password" required="required" /><br />

            <button @click.prevent="loginUser()">Se connecter</button>
          </form>
        </div>
      </div>
      <div class="connectError"></div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "Connexion",
  data() {
    return {
      newUser: {
        username: "",
        password: "",
        cPassword: "",
        email: "",
        image: "",
      },
      user: {
          email: "",
          password:""
      }
    };
  },
  computed: mapState([
    "isLogged"
  ]),
  methods: {
    //   Création d'un utilisateur

    fileSelected(e) {
      this.newUser.image = e.target.files[0];
      console.log(this.newUser);
    },
    createUser() {
      const regexName = new RegExp("[A-za-z0–9_]{5,}");
      if (
        regexName.test(this.newUser.username) &&
        regexName.test(this.newUser.email) &&
        regexName.test(this.newUser.password) &&
        regexName.test(this.newUser.cPassword)
      ) {
        if (this.newUser.password === this.newUser.cPassword) {
          const formData = new FormData();
          formData.append("username", this.newUser.username);
          formData.append("password", this.newUser.password);
          formData.append("email", this.newUser.email);
          formData.append("image", this.newUser.image);

          axios
            .post("http://localhost:3000/api/users/signup", formData, {
              headers: {
                "content-type": "multipart/form-data",
              }
            })
            .then((res) => {
              console.log(res);
              if (res.status === 201) {
                alert(
                  "Vous venez de créer un compte, vous pouvez désormais vous connecter 😁!"
                );
                location.href = "/";
              }
            })
            .catch((error) => {
              alert(error.response.data.error);
            });
        } else {
          alert("Mot de passe non vérifié !");
        }
      } else {
        alert(
          "Veuillez remplir tous les formulaires ! Votre nom doit contenir au moins 5 lettres/chiffres et ne doit pas contenir de caractères speciaux, idem pour le password"
        );
      }
    },
    // Connecter un utilisateur existant 
    loginUser() {
        axios.post('http://localhost:3000/api/users/login', { email: this.user.email, password: this.user.password })
        .then(res =>{
            console.log(res);
            localStorage.setItem('user', JSON.stringify(res.data));
            location.reload()
        })
        .catch(error =>{
            alert(error.response.data.error)
        })
    }
  },
};
</script>

<style scoped>
.connect {
  color: darkslategray;
  grid-area: main;
}

section {
  width: 70%;
  border-radius: 25px;
  background-color: white;
  box-shadow: 0px 10px 13px -7px #000000;
  margin: 50px auto;
  padding: 30px 0;
}

.connectWin {
  display: flex;
  justify-content: space-evenly;
}

form label {
  font-weight: 600;
}

form input {
  margin: 15px;
  border-radius: 5px;
}

.separation {
  border: 1px solid grey;
}

form button {
  background-color: forestgreen;
  padding: 10px 20px;
  border: solid 1px forestgreen;
  border-radius: 20px;
  box-shadow: 0px 10px 13px -7px #000000;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

form button:hover {
  transform: scale(1.02);
}

@media (max-width: 640px) {
  section {
    width: 80%;
  }
  .connectWin {
    flex-direction: column;
    justify-content: center;
  }
  .signup {
    margin-bottom: 20px;
  }
}
</style>