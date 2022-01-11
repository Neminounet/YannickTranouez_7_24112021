<template>
    <div class="main">
        <section class="pres">
            <div class="pres-image" style="background-image: url('https://images.unsplash.com/photo-1637580979689-fa99141d600f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80');"></div>
            <div class="pres-info">
                <h3>Bienvenue Emile !</h3>
                <button class="btn">Poster un message</button>
                <button class="btn">Page de Profil</button>
                <button class="btn">Se déconnecter</button>
            </div>
        </section>
        <section class="fil">
            <article class="post">
                <div class="post-head">
                    <h4 class="post-pseudo">Francis</h4>
                    <p class="post-time">Posté le 11/01/2022 à 16H39</p>
                    <div class="post-avatar" style="background-image: url(https://images.unsplash.com/photo-1589656966895-2f33e7653819?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80);"></div>
                </div>
                <div class="post-body">
                    <div class="post-image" style="background-image: url(https://images.unsplash.com/photo-1641392924934-17fd6c260a24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=712&q=80);"></div>
                    <div class="post-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab laudantium soluta, quidem dolore incidunt eligendi repellat sed consequuntur quaerat tempora? Ipsam ducimus reprehenderit iure ipsum nulla quia sint qui! Voluptatem?
                    </div>
                </div>
                <div class="post-footer">
                    <ul>
                        <li>
                            <a href="">(0) Commentaires</a>
                        </li>
                        <li>
                            <a href="">Modifier</a>
                        </li>
                        <li>
                            <a href="">supprimer</a>
                        </li>
                    </ul>
                </div>
            </article>
             <article class="post">
                <div class="post-head">
                    <h4 class="post-pseudo">Francis</h4>
                    <p class="post-time">Posté le 11/01/2022 à 16H39</p>
                    <div class="post-avatar" style="background-image: url(https://images.unsplash.com/photo-1589656966895-2f33e7653819?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80);"></div>
                </div>
                <div class="post-body">
                    <div class="post-image" style="background-image: url(https://images.unsplash.com/photo-1641392924934-17fd6c260a24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=712&q=80);"></div>
                    <div class="post-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab laudantium soluta, quidem dolore incidunt eligendi repellat sed consequuntur quaerat tempora? Ipsam ducimus reprehenderit iure ipsum nulla quia sint qui! Voluptatem?
                    </div>
                </div>
                <div class="post-footer">
                    <ul>
                        <li>
                            <a href="">(0) Commentaires</a>
                        </li>
                        <li>
                            <a href="">Modifier</a>
                        </li>
                        <li>
                            <a href="">supprimer</a>
                        </li>
                    </ul>
                </div>
            </article>
             <article class="post">
                <div class="post-head">
                    <h4 class="post-pseudo">Francis</h4>
                    <p class="post-time">Posté le 11/01/2022 à 16H39</p>
                    <div class="post-avatar" style="background-image: url(https://images.unsplash.com/photo-1589656966895-2f33e7653819?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80);"></div>
                </div>
                <div class="post-body">
                    <div class="post-image" style="background-image: url(https://images.unsplash.com/photo-1641392924934-17fd6c260a24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=712&q=80);"></div>
                    <div class="post-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab laudantium soluta, quidem dolore incidunt eligendi repellat sed consequuntur quaerat tempora? Ipsam ducimus reprehenderit iure ipsum nulla quia sint qui! Voluptatem?
                    </div>
                </div>
                <div class="post-footer">
                    <ul>
                        <li>
                            <a href="">(0) Commentaires</a>
                        </li>
                        <li>
                            <a href="">Modifier</a>
                        </li>
                        <li>
                            <a href="">supprimer</a>
                        </li>
                    </ul>
                </div>
            </article>
        </section>
    </div>
</template>

<script>
export default {
    name: 'Main'
}
</script>

<style scoped>
/* Paramètres généraux */

.main {
    grid-area: main;
    color:darkslategray;
    display: flex;
    justify-content: space-evenly;
}

/* Page de présentation */

.pres {
background-color:whitesmoke;
width: 35%;
height: 35vh;
display: flex;
justify-content: space-evenly;
border-radius: 10px;
box-shadow: 0px 10px 13px -7px #000000;
margin-top: 20px;
}

.pres-image {
 width: 200px;
 height: 200px;
 background-position: center;
 background-size: cover;
 margin: auto 0;
 border: 2px solid darkslategray;
 border-radius: 50%;
}

.pres-info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.btn {
    padding: 10px;
    border-radius: 15px;
    margin-bottom: 15px;
    color: white;
    font-weight: bold;
    box-shadow: 0px 10px 13px -7px #000000;
    transition: transform 0.5s;
    cursor: pointer;
}

.btn:nth-of-type(1){
    background-color: #0d5cdb;
    border: 1px solid #0d5cdb;
}

.btn:nth-of-type(2){
    background-color: #23bf21;
    border: 1px solid #23bf21;
}

.btn:nth-of-type(3){
    background-color: red;
    border: 1px solid red;
}

.btn:hover {
    transform: scale(1.02);
}

/* Fil d'acutalité */

.fil {
    width: 60%;
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
}

.post-image {
    width: 30vw;
    height: 30vh;
    background-position: center;
    background-size: cover;
    border-radius: 10px;
}

.post-footer {
    padding: 10px;
}

.post-footer a {
    text-decoration: none;
    color: darkslategray;
    font-weight: bold;
}

.post-footer ul {
    display: flex;
    justify-content: space-evenly;
}

.post-footer li {
    list-style: none;
}

/* Media Queries */

@media (max-width:767.98px){
    .main {
        flex-direction: column;
        align-items: center;
    }

    .pres {
        width: 90%;
        height: auto;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
    }
    .pres-image {
        width: 80px;
        height: 80px;
        margin: 10px 0 ;
    }
    .pres-info h3 {
        margin: 0;
    }
    .btn {
        padding: 10px 0;
        margin-bottom: 10px;
    }

    .fil {
        width: 90%;
    }

    .post-head, .post-body, .post-footer ul{
        flex-direction: column;
        align-items: center;
    }

    .post-head h4, .post-head p{
        margin:5px;
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

</style>