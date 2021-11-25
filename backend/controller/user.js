const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require('../models');
const { ValidationError, UniqueConstraintError } = require('sequelize')
const fs = require("fs");

// Création d'un Utilisateur POST/signup

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            db.User.create({
                username: req.body.username,
                password: hash,
                email: req.body.email,
                avatar: req.body.avatar//`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            })
                .then(() => res.status(201).json({ message: `L'utilisateur ${req.body.username} a bien été Créé` }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message, data: error })
            }
            if (error instanceof UniqueConstraintError) {
                return res.status(400).json({ message: error.message, data: error })
            }
            const message = "L'utilisateur n'a pas pu être ajouté. Réessayez dans quelques instants."
            res.status(500).json({ message, data: error })
        });
};


// Login d'un Utilisateur POST/login

exports.login = (req, res, next) => {
    db.User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: "Utilisateur non trouvé !" })
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: "Mot de passe incorrect !" })
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            `${process.env.TOKEN}`,
                            { expiresIn: "24h" }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Modifier utilisateur PUT/updateUser
exports.updateUser = (req, res, next) => {
    const userObject = req.file ?
        {
            ...JSON.parse(req.body.userId),
            avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    db.User.update({ ...userObject, id: req.params.id }, { where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Utilisateur Modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

//   Supprimer Utilisateur DELETE/deleteUser
exports.deleteUser = (req, res, next) => {
    db.User.findByPk(req.params.id)
    .then(user => {

        if (user === null) {
            const message = "L'Utilisateur demandé n'existe pas. Réessayez avec un autre identifiant."
            return res.status(404).json({ message })
        }
        const userDeleted = user;
        return db.User.destroy({
            where: { id: user.id }
        })
        
            .then(_ => {
                const message = `L'Utilisateur avec l'identifiant n°${userDeleted.id} a bien été supprimé.`
                res.json({ message, data: userDeleted })
            })
    })
    .catch(error => {
        const message = "L'Utilisateur n'a pas pu être supprimé. Réessayez dans quelques instants."
        res.status(500).json({ message, data: error })
     })
}

// Récupérer un Utilisateur GET/getOneUser
exports.getOneUser = (req, res, next) => {
    db.User.findByPk(req.params.id )
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));
}

// Récupérer tous les utilisateurs GET/GetAllUsers
exports.getAllUsers = (req, res, next) => {
    db.User.findAll()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      res.status(400).json({ error})
    });
}