const db = require("../models");

// Création d'un commentaire POST/createComment
// ============================================================================

exports.createComment = (req, res, next) => {

    db.Message.findOne({ where: { id: req.params.idMessage } })
    .then(message => {
        if(message) {
            const comment = new db.Comment({
                UserId: req.userId,
                MessageId: message.id, 
                text: req.body.text
            })
            comment.save()
            .then(()=> res.status(201).json({ message: "Commentaire Créé" }))
            .catch(error => res.status(400).json({ error }));
        } else {
            return res.status(404).json({ error: "Le message n'existe pas."})
        }
        
    })
    .catch(error => {
        const msg = "Une erreur s'est produite (message)"
        res.status(500).json({ msg, data: error })
    })
}

//  Supression d'un commentaire DELETE/deleteComment
// ============================================================================

exports.deleteComment = (req, res, next) => {
    db.Comment.findOne({ where: { id: req.params.idComment } })
    .then(comment => {
        if(comment){
            db.Comment.destroy({ where: { id: req.params.idComment } })
            .then(()=> res.status(200).json({ message: "Commentaire supprimé" }))
            .catch(()=> res.status(500).json({ error : "Une erreur s'est produite (comment 1)" }))
        } else {
            return res.status(404).json({ error: "Le commentaire n'existe pas."})
        }
    })
    .catch(error => {
        const msg = "Une erreur s'est produite (comment 2)"
        res.status(200).json({ msg, data: error })
    })
}

//  Récupération de tous les commentaires GET/getAllComments
// ============================================================================

exports.getAllComments = (req, res, next) =>{
    db.Comment.findAll({
        order: [["createdAt", "ASC"]],
        where: { MessageId: req.params.idMessage },
        include: [{
            model: db.User,
            attributes: ["username", "avatar"]
        }]
    })
    .then(comment =>{
        if(comment){
            res.status(200).json(comment);
        } else {
            res.status(404).json({ error: "Pas de commentaire" })
        }
    })
    .catch(error => {
        res.status(400).json({ error }) 
    });
}