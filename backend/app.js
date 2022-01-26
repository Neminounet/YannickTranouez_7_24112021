const express = require("express");
const helmet = require("helmet");
const path = require("path");
const cors = require('cors');
const db = require('./models');
const app = express();

// Les Middlewares 
// ============================================================================

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(function (req, res, next) {
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site')
    next()
  })

// Chemin vers dossier Statique, ici images
// ============================================================================

app.use('/images', express.static(path.join(__dirname, "images")));

// Les Routes
// ============================================================================

const userRoutes = require("./routes/user");
const messageRoutes = require("./routes/message");
const commentRoutes = require("./routes/comment");

// Utilisation des Routes 
// ============================================================================

app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/comments', commentRoutes);

//Synchronisation avec la Base donnée
// ============================================================================

db.sequelize.sync({ force: false })

// Exportation App.js
// ============================================================================

module.exports = app;