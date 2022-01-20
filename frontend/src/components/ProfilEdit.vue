<template>
  <div class="profilEdit">
    <div class="infoUser">
      <div
        class="userAvatar"
        :style="{ backgroundImage: 'url(' + this.currentUser.avatar + ')' }"
      ></div>
      <h2>{{ this.currentUser.username }}</h2>
    </div>
    <div class="Update">
      <h2>Modifier informations :</h2>
      <form class="formUpdate">
        <div class="formDiv">
          <label for="upAvatar">Modifier avatar</label>
          <input
            type="file"
            name="upAvatar"
            id="upAvatar"
            @change="fileSelected"
          /><br />
        </div>
        <div class="formBtn">
          <button @click.prevent="this.updateUser()">
            Envoyer les modifications
          </button>
          <p>Une nouvelle connexion sera nécéssaire</p>
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
      newUser: {
        image: "",
      },
    };
  },
  computed: mapState(["isLogged", "currentUser"]),
  methods: {
    fileSelected(e) {
      this.newUser.image = e.target.files[0];
      console.log(this.newUser.image);
      console.log(this.currentUser.id);
    },
    updateUser() {
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
            localStorage.removeItem("user");
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
          localStorage.removeItem("user");
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
  },
};
</script>

<style>
.profilEdit {
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: space-evenly;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 10px 13px -7px #000000;
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

.formDiv {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

label {
  font-weight: bold;
}
input {
  border-radius: 5px;
}

.formBtn {
  margin: 15px 0;
}

.formBtn p {
  color: red;
}

.formBtn button {
  margin-top: 10px;
  padding: 10px 30px;
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
  margin-top: 10px;
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

@media (max-width: 768px) {
  .profilEdit {
    width: 90%;
    margin: auto;
    flex-direction: column;
    align-items: center;
    margin-top: 15px;
  }

  .formDiv {
    width: 80%;
    margin: auto;
  }

  .btnDelete {
    margin: 20px 0;
  }
}
</style>