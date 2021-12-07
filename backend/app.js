const express = require("express");
const bcrypt = require("bcrypt")
const path = require("path");
const cors = require('cors');
const dotenv = require("dotenv").config();
const db = require('./models');
const app = express();

// Les Middlewares 
// ============================================================================

app.use(express.json());
app.use(cors());

// Chemin vers dossier Statique, ici images
// ============================================================================

app.use('/images', express.static(path.join(__dirname, "images")));

// Les Routes
// ============================================================================

const userRoutes = require("./routes/user");
const messageRoutes = require("./routes/message");

// Utilisation des Routes 
// ============================================================================

app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

//Synchronisation avec la Base donnée
// ============================================================================

db.sequelize.sync({force: true})
.then(_ => {
    bcrypt.hash(`${process.env.ADMIN_PASS}`, 10)
    .then(hash => db.User.create({ username: "Admin", password: hash, email: "admin@admin.com", admin: true }))
    .then(user => console.log(user.toJSON()))
})

// Exportation App.js
// ============================================================================

module.exports = app;