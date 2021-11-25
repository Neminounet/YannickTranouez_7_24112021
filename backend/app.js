const express = require("express");
const db = require('./models');
const app = express();

// Body-Parser
app.use(express.json());

// Routes
const userRoutes = require("./routes/user");
app.use('/api/users', userRoutes);

//Synchronisation avec la Base donnée
db.sequelize.sync({force: true})

// Exportation App.js
module.exports = app;