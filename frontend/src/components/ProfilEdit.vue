<template>
  <div class="profilEdit">
    <div class="infoUser">
      <div
        class="userAvatar"
        :style="{ backgroundImage: 'url(' + this.user.avatar + ')' }"
      ></div>
      <h3>Nom  : {{ this.user.username }}</h3>
      <h3>Mail : {{ this.user.email }}</h3>
      <div class="bio">
        <h3>A Propos de moi :</h3>
        <p> {{this.user.bio}} </p>
      </div>
    </div>
    <div class="Update">
      <h2>Modifier informations :</h2>
      <form class="formUpdate">

        <div class="formDiv">
          <label for="mUsername">Modifier Nom d'utilisateur</label>
          <input type="text" name="mUsername" id="mUsername" placeholder="5 caractères minimum" v-model="this.newUser.username">
          <button class="formBtn" @click.prevent="this.updateUsername()"> Modifier </button>
        </div>

        <div class="formDiv">
          <label for="mEmail">Modifier l'adresse Email</label>
          <input type="text" name="mEmail" id="mEmail" placeholder="Adresse mail valide" v-model="this.newUser.email">
          <button class="formBtn" @click.prevent="this.updateEmail()"> Modifier </button>
        </div>

        <div class="formDiv">
          <label for="mPassword">Modifier le mot de passe </label>
          <input type="password" name="mPassword" id="mPassword" placeholder="5 caractères minimum" v-model="this.newUser.password">
          <label for="cPassword">Confirmer le mot de passe</label>
          <input type="password" name="cPassword" id="cPassword" placeholder="5 caractères minimum" v-model="this.newUser.cPassword">
          <button class="formBtn" @click.prevent="this.updatePass()"> Modifier </button>
        </div>

        <div class="formDiv">
          <label for="upAvatar">Modifier avatar</label>
          <input type="file" name="upAvatar" id="upAvatar" @change="fileSelected"/>
          <button class="formBtn" @click.prevent="this.updateAvatar()"> Modifier </button>
        </div>

        <div class="formDiv">
          <label for="mBio">Modifier la biographie</label>
          <!-- <input type="text" name="mEmail" id="mEmail" placeholder="Adresse mail valide" v-model="this.newUser.email"> -->
          <textarea name="mBio" id="mBio" v-model="this.newUser.bio"></textarea>
          <button class="formBtn" @click.prevent="this.updateBio()"> Modifier </button>
        </div>

      </form>
    </div>
  </div>
  <button class="btnDelete" @click.prevent="deleteUser()">
    Supprimer Compte
  </button>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "ProfilEdit",
  data() {
    return {
      user: {},
      newUser: {
        username: "",
        email:"",
        password: "",
        cPassword: "",
        bio: "",
        image: ""
      },
    };
  },
  computed: mapState(["isLogged", "currentUser"]),
  methods: {
    // Selection d'une Image pour l'avatar
    fileSelected(e) {
      this.newUser.image = e.target.files[0];
      console.log(this.newUser.image);
      console.log(this.currentUser.id);
    },
    // Mise à jour de l'image de Profil 
    updateAvatar() {
      if (this.newUser.image !== "") {
        const userId = this.currentUser.userId;
        const formData = new FormData();
        formData.append("image", this.newUser.image);
        axios
          .put(`http://localhost:3000/api/users/${userId}`, formData, {
            headers: {
              "content-type": "multipart/form-data",
              Authorization: "Bearer " + this.currentUser.token,
            },
          })
          .then((res) => {
            console.log(res.data);
            Swal.fire({
              text: "Modification image réussie !",
              footer: "Redirection en cours...",
              icon: "success",
              timer: 1000,
              showConfirmButton: false,
              timerProgressBar: true,
              willClose: () => {
                location.reload();
              },
            });
          })
          .catch((error) => {
            console.log(error.response.data.error);
          });
      } else {
        alert("Choisissez une image !");
      }
    },
    // Mise à jour de l'username
    updateUsername() {
      const regexName = new RegExp("[A-za-z0–9_]{5,}");
      if (regexName.test(this.newUser.username)) {
        const userId = this.currentUser.userId;
        axios
          .put(`http://localhost:3000/api/users/${userId}`, {username: this.newUser.username}, {
            headers: {
              Authorization: "Bearer " + this.currentUser.token,
            },
          })
          .then((res) => {
            console.log(res.data);
            Swal.fire({
              text: "Modification Nom d'Utilisateur réussi !",
              footer: "Redirection en cours...",
              icon: "success",
              timer: 1000,
              showConfirmButton: false,
              timerProgressBar: true,
              willClose: () => {
                location.reload();
              },
            });
          })
          .catch((error) => {
            console.log(error.response.data.error);
          });
      } else {
        alert("Entrez un nouveau Nom d'utilisateur !");
      }
    },
    // Mise à jour de l'email 
    updateEmail() {
      const regexName = new RegExp("[A-za-z0–9_]{5,}");
      if (regexName.test(this.newUser.email)) {
        const userId = this.currentUser.userId;
        axios
          .put(`http://localhost:3000/api/users/${userId}`, {email: this.newUser.email}, {
            headers: {
              Authorization: "Bearer " + this.currentUser.token,
            },
          })
          .then((res) => {
            console.log(res.data);
            Swal.fire({
              text: "Modification de l'adresse Email réussie !",
              footer: "Redirection en cours...",
              icon: "success",
              timer: 1000,
              showConfirmButton: false,
              timerProgressBar: true,
              willClose: () => {
                location.reload();
              },
            });
          })
          .catch((error) => {
            console.log(error.response.data.error);
          });
      } else {
        alert("Entrez une adresse mail valide !");
      }
    },
    // Mise à jour du password
    updatePass(){
      const regexName = new RegExp("[A-za-z0–9_]{5,}");
      if (regexName.test(this.newUser.password && this.newUser.cPassword)) {
        if (this.newUser.password === this.newUser.cPassword) {
          const userId = this.currentUser.userId;
        axios
          .put(`http://localhost:3000/api/users/${userId}`, {password: this.newUser.password}, {
            headers: {
              Authorization: "Bearer " + this.currentUser.token,
            },
          })
          .then((res) => {
            console.log(res.data);
            Swal.fire({
              text: "Modification du Mot de passe réussi !",
              footer: "Redirection en cours...",
              icon: "success",
              timer: 1000,
              showConfirmButton: false,
              timerProgressBar: true,
              willClose: () => {
                location.reload();
              },
            });
          })
          .catch((error) => {
            console.log(error.response.data.error);
          });
        } else {
          alert("Mot de passe non confirmé !")
        }
      } else {
        alert("Mot de passe incorrecte !");
      }
    },
    // Mise à jour de la biographie
    updateBio() {
      if (this.newUser.bio != '') {
        const userId = this.currentUser.userId;
        axios
          .put(`http://localhost:3000/api/users/${userId}`, {bio: this.newUser.bio}, {
            headers: {
              Authorization: "Bearer " + this.currentUser.token,
            },
          })
          .then((res) => {
            console.log(res.data);
            Swal.fire({
              text: "Modification de la Biographie réussie !",
              footer: "Redirection en cours...",
              icon: "success",
              timer: 1000,
              showConfirmButton: false,
              timerProgressBar: true,
              willClose: () => {
                location.reload();
              },
            });
          })
          .catch((error) => {
            console.log(error.response.data.error);
          });
      } else {
        alert("Ecrire quelque chose !");
      }
    },
    // Suppression de l'utilisateur 
    deleteUser() {
      const userId = this.currentUser.userId;
      axios
        .delete(`http://localhost:3000/api/users/${userId}`, {
          headers: {
            Authorization: "Bearer " + this.currentUser.token,
          },
        })
        .then((res) => {
          console.log(res);
          localStorage.removeItem("connectedUser");
          Swal.fire({
            text: "Compte supprimé !",
            footer: "Redirection en cours...",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
            timerProgressBar: true,
            willClose: () => {
              location.reload();
            },
          });
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
    },
    // Récupération de l'utilisateur 
    getUser() {
      const userId = this.currentUser.userId
      axios.get(`http://localhost:3000/api/users/${userId}`, {
        headers: {
        Authorization: "Bearer " + this.currentUser.token,
        },
      })
      .then(res => {
        this.user = res.data
      })
      .catch((error) => {
      console.log(error.response.data.error);
      });
    }
  },
  created() {
    this.getUser();
  }
};
</script>

<style scoped>
.profilEdit {
  width: 80%;
  margin: 30px auto;
  display: flex;
  justify-content:space-evenly;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 10px 13px -7px #000000;
}
.infoUser {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
}

.bio {
  width: 40%;
}

.userAvatar {
  width: 200px;
  height: 200px;
  background-position: center;
  background-size: cover;
  border: 2px solid darkslategray;
  border-radius: 50%;
  margin-top: 10px;
}

.formUpdate {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.formDiv {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 15px;
  padding: 10px;
  border-left: 3px solid darkslategray;
  border-right: 3px solid darkslategray;
  border-radius: 30%
}

label {
  font-weight: bold;
  margin: 10px;
}
input {
  margin: 10px;
  border-radius: 5px;
}
textarea {
  height: 80px;
  border: 1px solid darkslategray;
  border-radius: 15px
}


.formBtn {
  margin: 10px;
  padding: 10px;
  background-color: green;
  border: 1px solid green;
  border-radius: 15px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 10px 13px -7px #000000;
}

.formBtn :hover {
  transform: scale(1.05);
  box-shadow: 0px 10px 20px -7px #000000;
}

.btnDelete {
  margin: 30px;
  padding: 10px 30px;
  background-color: red;
  border: 1px solid red;
  border-radius: 15px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 10px 13px -7px #000000;
}

.btnDelete:hover {
  transform: scale(1.05);
  box-shadow: 0px 10px 20px -7px #000000;
}

@media (max-width: 767.9px) {
  .profilEdit {
    width: 90%;
    margin: auto;
    flex-direction: column;
    align-items: center;
    margin-top: 15px;
  }

  .infoUser {
    width: 90%;
  }

  .formDiv {
    width: 80%;
    margin: 10px auto;
  }

  .btnDelete {
    margin: 20px 0;
  }
  .bio {
    width: 80%;
  }
}
</style>