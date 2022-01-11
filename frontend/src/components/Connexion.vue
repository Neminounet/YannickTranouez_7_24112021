<template>
    <div class="connect">
        <section>
            <h1>Connectez-vous à Groupomania</h1>
            <div class="connectWin">
                <div class="signup">
                    <h2>Inscrivez-vous</h2>
                    <form>
                        <label for="fname">Nom d'utilisateur :</label><br>
                        <input type="text" id="fname" name="fname" required><br>

                        <label for="fpass">Mot de Passe :</label><br>
                        <input type="password" id="fpass" name="fpass" required><br>

                        <label for="femail">Adresse Email :</label><br>
                        <input type="email" id="femail" name="femail" required><br>

                        <label for="favatar">Photo de profil (Facultatif) :</label><br>
                        <input type="file" id="favatar" name="favatar"><br>

                        <button> S'inscrire </button>
                    </form>
                </div>
                <div class="separation"></div>
                <div class="login">
                    <h2>Déjà inscrit ? </h2>
                    <form>
                        <label for="lemail">Adresse Email :</label><br>
                        <input type="email" id="lemail" name="lemail" required><br>

                        <label for="lpass">Mot de Passe :</label><br>
                        <input type="password" id="lpass" name="lpass" required><br>

                        <button> Se connecter </button>

                    </form>

                </div>
            </div>
            <div class="connectError">

            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'Connexion'
}
</script>

<style scoped>

.connect {
    color:darkslategray;
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
    font-weight:600;
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
    /* Créer une petite animation relief pour le bouton */
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