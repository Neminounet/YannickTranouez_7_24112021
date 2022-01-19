<template>
  <div class="main">
    <section class="pres">
      <div
        class="pres-image"
        :style="{ backgroundImage: 'url(' + this.currentUser.avatar + ')' }"
      ></div>
      <div class="pres-info">
        <h3>Bienvenue {{ this.currentUser.username }}</h3>
        <PostMessage />
      </div>
    </section>
    <section class="fil">
      <h2 v-if="this.messages[0] == 0">Aucun Message</h2>
      <template v-else>
        <article
          class="post"
          v-for="message in this.messages[0]"
          :key="message.id"
        >
          <div class="post-head">
            <h4 class="post-pseudo">{{ message.User.username }}</h4>
            <p class="post-time">Posté le {{ dateFormat(message.createdAt) }}</p>
            <div
              class="post-avatar"
              :style="{ backgroundImage: 'url(' + message.User.avatar + ')' }"
            ></div>
          </div>
          <div class="post-body">
            <div
              v-if="message.image !== null"
              class="post-image"
              :style="{ backgroundImage: 'url(' + message.image + ')' }"
            ></div>
            <div class="post-text">{{ message.text }}</div>
          </div>
          <div class="post-footer">
            <ul>
              <li>
                <router-link class="routerLink" :to="{name: 'Post', params: { id: message.id }}">
                  <p>({{ message.Comments.length }}) Commentaires</p>
                  </router-link>
              </li>
              <li>
                <router-link class="routerLink" to="/">
                  <p v-if="this.currentUser.admin === true || this.currentUser.userId == message.UserId" v-on:click="deletePost(message.id)">supprimer</p>
                </router-link>
              </li>
            </ul>
          </div>
        </article>
      </template>
    </section>
  </div>
</template>

<script>
import PostMessage from "./PostMessage.vue";
import { mapState } from "vuex";
import Swal from "sweetalert2"
import axios from "axios";

export default {
  name: "Main",
  components: {
    PostMessage,
  },
  data(){
      return {
          messages: []
      }
  },
  computed: mapState(["currentUser"]),
  methods: {
    getAllPosts() {
      axios
        .get("http://localhost:3000/api/messages/", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.currentUser.token
          }
        })
        .then((res) => {
          this.messages.push(res.data)
        })
        .catch((error) => {
          console.log(error.response.data.error);
        })
    },

    dateFormat(date){
            const event = new Date(date);
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            return event.toLocaleDateString('fr-FR', options);
    },

    deletePost(id){
      axios.delete(`http://localhost:3000/api/messages/${id}`, {
        headers: {
            "Authorization": "Bearer " + this.currentUser.token
        }
      })
      .then( ()=>{
        Swal.fire({
          text: "Message supprimé !",
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
      this.getAllPosts()
  }
};
</script>

<style scoped>
/* Paramètres généraux */

.main {
  grid-area: main;
  width: 100vw;
  color: darkslategray;
  display: flex;
  justify-content: space-evenly;
}

/* Page de présentation */

.pres {
  background-color: whitesmoke;
  width: 40%;
  height: 35vh;
  display: flex;
  justify-content: space-around;
  border-radius: 10px;
  box-shadow: 0px 10px 13px -7px #000000;
  margin-top: 20px;
}

.pres-image {
  width: 150px;
  height: 150px;
  background-position: center;
  background-size: cover;
  margin: auto 0;
  border: 2px solid darkslategray;
  border-radius: 50%;
}

.pres-info {
  width: 60%;
  display: flex;
  flex-direction: column;
}

.pres-info h3 {
  margin-bottom: 5px;
}

.btn {
  padding: 10px;
  border-radius: 15px;
  margin-bottom: 15px;
  color: white;
  font-weight: bold;
  box-shadow: 0px 10px 13px -7px #000000;
  cursor: pointer;
}

.btn:nth-of-type(1) {
  background-color: #0d5cdb;
  border: 1px solid #0d5cdb;
}

.btn:nth-of-type(2) {
  background-color: #23bf21;
  border: 1px solid #23bf21;
}

.btn:nth-of-type(3) {
  background-color: red;
  border: 1px solid red;
}

.btn:hover {
  transform: scale(1.02);
}

/* Fil d'acutalité */

.fil {
  width: 50%;
  margin-bottom: 20px;
}

.post {
  margin-top: 20px;
  background-color: whitesmoke;
  border-radius: 10px;
  box-shadow: 0px 10px 13px -7px #000000;
}

.post-head {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid darkslategray;
}

.post-avatar {
  width: 60px;
  height: 60px;
  background-position: center;
  background-size: cover;
  border: 2px solid darkslategray;
  border-radius: 50%;
}

.post-body {
  padding: 20px;
  border-bottom: 1px solid darkslategray;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.post-image {
  width: 30vw;
  height: 30vh;
  background-position: center;
  background-size: cover;
  border-radius: 10px;
  margin: 20px;
}

.post-footer {
  padding: 10px;
}

.post-footer p {
  color: darkslategray;
  font-weight: bold;
}

.post-footer ul {
  display: flex;
  justify-content: center;
}

.post-footer li {
  list-style: none;
  margin: 0 10px;
}

.routerLink {
  text-decoration: none;
}

/* Media Queries */

@media (max-width: 768px) {
  .main {
    flex-direction: column;
    align-items: center;
  }

  .pres {
    width: 85%;
    height: auto;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
  }
  .pres-image {
    width: 80px;
    height: 80px;
    margin: 10px 0;
  }

  .pres-info {
    width: 90%;
  }
  .pres-info h3 {
    margin: 0;
  }
  .btn {
    padding: 10px 0;
    margin-bottom: 10px;
  }

  .fil {
    width: 85%;
  }

  .post-head,
  .post-body,
  .post-footer ul {
    flex-direction: column;
    align-items: center;
  }

  .post-head h4,
  .post-head p {
    margin: 5px;
  }

  .post-image {
    width: 80vw;
    margin-bottom: 10px;
  }

  .post-footer ul {
    padding-left: 0;
  }

  .post-footer li {
    margin-bottom: 10px;
  }
}
@media (min-width: 769px) {
  .pres {
    height: 40vh;
    width: 45%;
  }

  .pres-info {
    justify-content: space-evenly;
  }
}
</style>