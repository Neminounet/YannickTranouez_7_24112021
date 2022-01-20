<template v-if="this.comments[0] != 0">
  <div class="comments" v-for="comment in this.comments[0]" :key="comment.id">
    <div class="comment">
      <div class="commentHead">
        <h4>{{ comment.User.username }}</h4>
        <p>Posté le : {{ this.dateFormat(comment.createdAt )}} </p>
      </div>
      <div class="commentBody">
        <h5>{{comment.text}}</h5>
      </div>
      <div class="commentFoot" v-if="this.currentUser.admin == true || this.currentUser.userId === comment.UserId">
        <a href="" @click="deleteComment(comment.id)">supprimer</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import Swal from "sweetalert2"

export default {
  name: "Comments",
  data() {
    return {
      comments: [],
    };
  },
  computed: mapState(["currentUser"]),
  methods: {
    dateFormat(date) {
        const event = new Date(date);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return event.toLocaleDateString('fr-FR', options);
    },
    getComments() {
      const postId = this.$route.params.id;
      axios
        .get(`http://localhost:3000/api/comments/${postId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.currentUser.token,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.comments.push(res.data);
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
    },
    deleteComment(id){
      axios.delete(`http://localhost:3000/api/comments/${id}`, {
        headers: {
            "Authorization": "Bearer " + this.currentUser.token
        }
      })
      .then( ()=>{
        Swal.fire({
          text: "Commentaire supprimé !",
          footer: "Redirection en cours...",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
          timerProgressBar: true,
          willClose: () => { location.reload() }
        })
      })
      .catch((error) => {
        console.log(error.response.data.error);
      })
    }
  },
  created() {
      this.getComments()
  },
};
</script>

<style scoped>
.comment {
  margin: 30px auto;
  width: 40%;
  background-color: lightgrey;
  padding: 5px;
  border-radius: 30px;
  box-shadow: 0px 10px 13px -7px #000000;
}

.commentHead {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid darkslategray;
}

.commentFoot a {
  text-decoration: none;
  color: darkslategray;
  font-weight: bold;
}

@media (max-width: 768px) {
  .comment {
    width: 70%;
  }

  .commentHead {
    flex-direction: column;
  }

  .commentHead h4,
  p {
    margin: 5px 0;
  }
}
</style>