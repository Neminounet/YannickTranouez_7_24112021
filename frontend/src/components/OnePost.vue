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
      user: {},
      comment: "",
    };
  },
  computed: mapState(["currentUser"]),
  methods: {
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
      }

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
}
</style>