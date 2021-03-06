const db = require('../models');
const jwt = require("jsonwebtoken");
const fs = require("fs");


// Création d'un message POST/createMessage
// ============================================================================

exports.createMessage = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.TOKEN}`)
    const userID = decodedToken.userId;

    let messageImg;
    if (req.file) {
        messageImg = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    }
    const message = new db.Message({
        UserId: userID,
        text: req.body.text,
        image: messageImg
    });
    message.save()
        .then(() => res.status(201).json({ message: "Message Créé" }))
        .catch(error => res.status(400).json({ error }));
}

// Modification d'un message PUT/updateMessage
// ============================================================================

exports.updateMessage = (req, res, next) => {
    db.Message.findByPk(req.params.id)
        .then(msg => {
            if (req.file) {
                if (msg.image !== null) {
                    const filename = msg.image.split("/images/")[1];
                    fs.unlink(`images/${filename}`, () => {
                        const messageObject = req.file ?
                            {
                                ...req.body,
                                image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                            } : { ...req.body };
                        db.Message.update({ ...messageObject, id: req.params.id }, { where: { id: req.params.id } })
                            .then(_ => {
                                const message = `Le message a bien été modifié.`;
                                res.status(200).json({ message })
                            })
                            .catch(error => res.status(400).json({ error }));
                    })
                } else {
                    messageImg = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
                    db.Message.update({
                        text: req.body.text,
                        image: messageImg
                    }, { where: { id: req.params.id } })
                        .then(() => {
                            const message = "Le message a bien été modifié";
                            res.status(200).json({ message })
                        })
                        .catch(error => res.status(400).json({ error }));
                }
            } else {
                db.Message.update({
                    text: req.body.text
                }, { where: { id: req.params.id } })
                    .then(() => {
                        const message = "Le message a bien été modifié";
                        res.status(200).json({ message })
                    })
                    .catch(error => res.status(400).json({ error }));
            }
        })
}

// Suppression du message DELETE/deleteMessage
// ============================================================================

exports.deleteMessage = (req, res, next) => {
    db.Message.findByPk(req.params.id)
        .then(message => {
            if (message.image == null) {
                db.Message.destroy({ where: { id: message.id } })
                    .then(_ => {
                        const msg = "Le message a bien été supprimé.";
                        res.status(200).json({ msg })
                    })
                    .catch(error => res.status(400).json({ error }));
            } else {
                const filename = message.image.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                    db.Message.destroy({ where: { id: message.id } })
                        .then(_ => {
                            const msg = "Le message a bien été supprimé.";
                            res.status(200).json({ msg })
                        })
                        .catch(error => res.status(400).json({ error }));
                })
            }
        })
        .catch(error => {
            const msg = "Le message n'a pas pu être supprimé. Rééssayez dans quelques instants."
            res.status(500).json({ msg, data: error })
        })
}

// Récupération d'un seul Message GET/getOneMessage
// ============================================================================

exports.getOneMessage = (req, res, next) => {
    db.Message.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: db.User,
            attributes: ["username", "avatar"]
        }, {
            model: db.Comment
        }]
    })
        .then(message => {
            if (message) {
                res.status(200).json(message);
            } else {
                res.status(404).json({ error: "Pas de message" });
            }
        })
        .catch(error => {
            res.status(400).json({ error })
        });
}


// Récupération des Messages GET/getAllMessages
// ============================================================================

exports.getAllMessages = (req, res, next) => {
    db.Message.findAll({
        order: [["createdAt", "DESC"]],
        include: [{
            model: db.User,
            attributes: ["username", "avatar"]
        }, {
            model: db.Comment
        }]
    })
        .then(message => {
            if (message) {
                res.status(200).json(message);
            } else {
                res.status(404).json({ error: "Pas de message" });
            }
        })
        .catch(error => {
            res.status(400).json({ error })
        });
}