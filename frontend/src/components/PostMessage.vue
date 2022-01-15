<template>
  <div class="postMessage">
    <div class="postForm">
      <label for="text">Postez un message</label>
      <textarea
        name="text"
        id="text"
        cols="30"
        rows="10"
        v-model="this.text"
        required="required"
      ></textarea>

      <label for="image">Postez une image</label>
      <input type="file" name="image" id="image" @change="fileSelected" />

      <button @click="postMessage()">Post</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";


export default {
  name: "PostMessage",
  data() {
    return {
      text: "",
      image: "",
    }
  },
  computed: mapState([
    "currentUser"
  ]),
  methods: {
    fileSelected(e) {
      this.image = e.target.files[0];
      
    },
    postMessage() {
        if(this.text !== '') {
            const formData = new FormData();
            formData.append("text", this.text);
            formData.append("image", this.image);
            axios.post('http://localhost:3000/api/messages', formData, {
                headers: {
                "content-type": "multipart/form-data",
                'Authorization': 'Bearer ' + this.currentUser.token
              }
            })
            .then(res =>{
                console.log(res)
                location.reload();
            })
            .catch((error) => {
              alert(error.response.data.error);
            });
        } else {
            alert("Veuillez écrire un message");
        }
    },
  },
};
</script>

<style scoped>
.postMessage {
  background-color: lightgrey;
  padding: 10px;
  border-radius: 10px;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
}

.postForm {
  display: flex;
  flex-direction: column;
}

.postForm button {
  margin: 5px 0;
  border-radius: 10px;
  border: 1px solid green;
  background-color: green;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

@media (max-width:767.98px){
    .postMessage{
    }
}
</style>