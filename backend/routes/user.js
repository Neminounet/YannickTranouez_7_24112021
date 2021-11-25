const express = require("express");
const router = express.Router();
const db = require('../models');

router.post('/new', (req, res) =>{
    db.User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        avatar: req.body.avatar
    }).then(newUser => res.send(newUser));
})

module.exports = router;