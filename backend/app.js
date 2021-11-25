const express = require("express");
const bcrypt = require("bcrypt")
const path = require("path");
const dotenv = require("dotenv").config();
const db = require('./models');
const app = express();

// Body-Parser
app.use(express.json());

// Chemin vers dossier Statique, ici images
app.use('/images', express.static(path.join(__dirname, "images")));

// Routes
const userRoutes = require("./routes/user");
app.use('/api/users', userRoutes);

//Synchronisation avec la Base donnée
db.sequelize.sync({force: true})
.then(_ => {
    bcrypt.hash(`${process.env.ADMIN_PASS}`, 10)
    .then(hash => db.User.create({ username: "Admin", password: hash, email: "admin@admin.com", avatar: "", admin: true }))
    .then(user => console.log(user.toJSON()))
})

// Exportation App.js
module.exports = app;