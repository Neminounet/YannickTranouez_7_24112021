const db = require('../models');
const fs = require("fs");


// Création d'un message POST/createMessage
// ============================================================================

exports.createMessage = (req, res, next) => {
    let messageImg;
    if(req.file) {
        messageImg = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    }
    const message = new db.Message({
        UserId: req.body.UserId,
        text: req.body.text,
        image: messageImg
    });
    message.save()
    .then(()=> res.status(201).json({ message: "Message Créé" }))
    .catch(error => res.status(400).json({ error }));
}

// Modification d'un message PUT/updateMessage
// ============================================================================

exports.updateMessage = (req, res, next) => {
    const messageObject = req.file ? 
    {
        ...req.body,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ... req.body };
    db.Message.update({ ...messageObject, id: req.params.id }, { where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: 'Message Modifié !' }))
    .catch(error => res.status(400).json({ error }));
}

// Suppression du message DELETE/deleteMessage
// ============================================================================

exports.deleteMessage = (req, res, next) => {
    db.Message.findByPk(req.params.id)
    .then(message => {
        const filename = message.image.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
            db.Message.destroy({ where: { id: message.id } })
            .then(_=> {
                const msg = "Le message a bien été supprimé.";
                res.status(200).json({ msg })
            })
            .catch(error => res.status(400).json({ error }));
        })
    })
    .catch(error => {
        const msg = "Le message n'a pas pu être supprimé. Rééssayez dans quelques instants."
        res.status(500).json({ msg, data: error })
    })
}