<template>
  <div class="onePost">
    <div class="onePostHead">
      <h2>{{ this.user.username }}</h2>
      <h3>Posté le : {{ this.dateFormat(this.post.createdAt) }}</h3>
      <div
        class="headImg"
        :style="{ backgroundImage: 'url(' + this.user.avatar + ')' }"
      ></div>
    </div>
    <div class="onePostBody">
      <div
        v-if="this.post.image !== null"
        class="bodyImg"
        :style="{ backgroundImage: 'url(' + this.post.image + ')' }"
      ></div>
      <h4 class="bodyText">{{ this.post.text }}</h4>
    </div>
    <div class="onePostFoot">
      <h3>Ecrire un Commentaire</h3>
      <textarea
        name="write"
        id="write"
        v-model="this.comment"
        required="required"
      ></textarea
      ><br />
      <button class="btnComment" @click="postComment(post.id)">Commenter</button>
    </div>
  </div>
  <div v-if="this.currentUser.userId === this.post.UserId" class="edit">
      <h3>Modifier le post</h3>
      <div class="editWindow">
        <div class="postEdit">
          <label for="postText">Editer le Message</label>
          <!-- <input type="text" name="postText" id="postText"> -->
          <textarea name="postText" id="postText" v-model="this.postEdit.text"></textarea>
          <button class="btnComment" @click.prevent="updateMessage()">Modifier</button>
        </div>
        <div class="postEdit">
          <label for="postImg">Changer d'image</label>
          <input type="file" name="postImg" id="postImg" @change="fileSelected">
          <button class="btnComment" @click.prevent="updateImg()">Modifier</button>
        </div>
      </div>
  </div>
  <Comments />
</template>

<script>
import Comments from "./Comments.vue";
import { mapState } from "vuex";
import axios from "axios";
import Swal from "sweetalert2"

export default {
  name: "OnePost",
  components: {
    Comments,
  },
  data() {
    return {
      post: {},
      postEdit: {
        text:"",
        image:""
      },
      user: {},
      comment: "",
    };
  },
  computed: mapState(["currentUser"]),
  methods: {
// Convertir les dates 

    dateFormat(date) {
      const event = new Date(date);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return event.toLocaleDateString("fr-FR", options);
    },
// Récupérer les Messages

    getMessage() {
      const postId = this.$route.params.id;
      axios
        .get(`http://localhost:3000/api/messages/${postId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.currentUser.token,
          },
        })
        .then((res) => {
          this.post = res.data;
          this.user = res.data.User;
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
    },
// Poster un commentaire

    postComment() {
      const postId = this.$route.params.id;
      const textComment = {text: this.comment};
      const config = {
          headers: {Authorization: "Bearer " + this.currentUser.token}
      }
        axios.post(`http://localhost:3000/api/comments/${postId}`, textComment, config )
        .then(res =>{
            console.log(res)
            Swal.fire({
                text: "Commentaire Créé !",
                footer: "Redirection en cours...",
                icon: "success",
                timer: 1000,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => { location.reload() }
            })
        })
        .catch(error =>{
            console.log(error.response.data.error)
        })
      },

// Modification du message
  updateMessage() {
      if (this.postEdit.text !== '') {
        const postId = this.post.id;
        console.log(postId)
        axios
          .put(`http://localhost:3000/api/messages/${postId}`, {text: this.postEdit.text}, {
            headers: {
              Authorization: "Bearer " + this.currentUser.token,
            },
          })
          .then((res) => {
            console.log(res.data);
            Swal.fire({
              text: "Modification du message réussie !",
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
        alert("Ecrivez quelqu chose !");
      }
    },
// Selectionner une image 
  fileSelected(e) {
      this.postEdit.image = e.target.files[0];
      console.log(this.postEdit.image)
    },

// Mettre à jour une image de message 
   updateImg() {
      if (this.postEdit.image !== "") {
        const postId = this.post.id;
        const formData = new FormData();
        formData.append("image", this.postEdit.image);
        axios
          .put(`http://localhost:3000/api/messages/${postId}`, formData, {
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
  },
  created() {
    this.getMessage();
  },
};
</script>

<style scoped>
.onePost {
  margin: 30px auto;
  width: 60%;
  background-color: white;
  padding: 20px;
  border-radius: 30px;
  box-shadow: 0px 10px 13px -7px #000000;
}

.onePostHead {
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid darkslategray;
}

.headImg {
  width: 80px;
  height: 80px;
  background-position: center;
  background-size: cover;
  border: 3px solid darkslategray;
  border-radius: 50%;
  margin: 5px;
}

.onePostBody {
  border-bottom: 2px solid darkslategray;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bodyImg {
  margin-top: 15px;
  width: 80%;
  height: 40vh;
  background-position: center;
  background-size: cover;
  border-radius: 5px;
}

.onePostFoot textarea {
  width: 60%;
  height: 50px;
  border: 2px solid darkslategray;
  border-radius: 10px;
  font-size: 1.2em;
}

.edit {
  width: 60%;
  margin: auto;
  background-color: white;
  padding:5px 20px;
  margin-bottom: 30px;
  border-radius: 30px;
  box-shadow: 0px 10px 13px -7px #000000;
}
.editWindow {
  display: flex;
  justify-content: space-evenly;
  font-weight: bold;
}

.postEdit {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#postText {
  width: 250px;
  border: 2px solid darkslategray;
  border-radius: 10px;
}

.btnComment {
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

.btnComment:hover {
  transform: scale(1.05);
  box-shadow: 0px 10px 20px -7px #000000;
}

/* Media Queries */

@media (max-width: 768px) {
  .onePost {
    width: 80%;
  }

  .onePostHead {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 2px solid darkslategray;
  }

  .onePostHead h2 {
    font-size: 1.3em;
    margin: 5px 0;
  }

  .onePost h3 {
    font-size: 1.1em;
    margin: 5px 0;
    font-weight: 200;
  }
  .bodyImg {
    height: 20vh;
  }

  .edit {
    width: 80%;
    margin-bottom: 20px;
  }

  .editWindow {
    flex-direction: column;
  }

  .postEdit {
    margin: 10px;
  }
}
</style>