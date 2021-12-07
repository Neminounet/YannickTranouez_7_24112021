const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require('../models');
const fs = require("fs");


// Création d'un Utilisateur POST/signup
// ============================================================================

exports.signup = (req, res, next) => {
    let avatarImg;
    if(req.file) {
        avatarImg = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    }
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new db.User({
                username: req.body.username,
                email: req.body.email,
                password: hash,
                avatar: avatarImg
            });
            user.save()
                .then(()=> res.status(201).json({ message: "utilisateur Créé" }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}


// Login d'un Utilisateur POST/login
// ============================================================================


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
                        message: "utilisateur connecté",
                        userId: user.id,
                        username: user.username,
                        avatar: user.avatar,
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
// ============================================================================


exports.updateUser = (req, res, next) => {
    const userObject = req.file ?
        {
            ...req.body,
            avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    db.User.update({ ...userObject, id: req.params.id }, { where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Utilisateur Modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

//   Supprimer Utilisateur DELETE/deleteUser
// ============================================================================

exports.deleteUser = (req, res, next) => {
    db.User.findByPk(req.params.id)
    .then(user => {
        if(user.avatar !== `http://${process.env.HOST}/images/default_user.png`) {
            const filename = user.avatar.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
                db.User.destroy({ where: { id: user.id } })
                    .then(_ => {
                        const message = `L'Utilisateur a bien été supprimé.`;
                        res.status(200).json({ message })
                    })
                    .catch(error => res.status(400).json({ error }));
            })      
        } else {
            db.User.destroy({ where: { id: user.id } })
                .then(_ => {
                    const message = `L'Utilisateur avec l'identifiant a bien été supprimé.`;
                    res.status(200).json({ message })
                })
                .catch(error => res.status(400).json({ error }));
        }
         
    })
    .catch(error => {
        const message = "L'Utilisateur n'a pas pu être supprimé. Réessayez dans quelques instants."
        res.status(500).json({ message, data: error })
     })
}

// Récupérer un Utilisateur GET/getOneUser
// ============================================================================

exports.getOneUser = (req, res, next) => {
    db.User.findByPk(req.params.id )
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));
}

// Récupérer tous les utilisateurs GET/GetAllUsers
// ============================================================================

exports.getAllUsers = (req, res, next) => {
    db.User.findAll()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      res.status(400).json({ error})
    });
}