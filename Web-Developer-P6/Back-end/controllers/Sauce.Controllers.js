// #region Déclaration des variables 

const Sauce = require("../models/Sauce.models");
const fs = require('fs');

// #endregion Déclaration des variables

// #region Création des sauces
const sauceCreate = (req,res) =>{
    const sauceObject = JSON.parse(req.body.sauce);
    sauceObject._userId = undefined;
    delete sauceObject._id
    delete sauceObject._userId
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => {res.status(201).json({message: "Sauce enregistré"})})
        .catch((error) => {res.status(400).json({error})})


};

// #endregion Création des sauces

// #region Voire les sauces
const showSauce = (req, res) =>{
    Sauce.find()
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(400).json({ error }));
};

// #endregion Voire les sauces

// #region Suppresion des sauces
const deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
    .then(sauce => {
        if (sauce.userId != req.auth.userId) {
            res.status(401).json({message: 'Not authorized'});
        } else {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({_id: req.params.id})
                    .then(() => { res.status(200).json({message: 'Sauce supprimé !'})})
                    .catch(error => res.status(401).json({ error }));
            });
        }
    })
    .catch( error => {
        res.status(500).json({ error });
    });

};

// #endregion Suppresion des sauces

// #region Récupération des sauces

const id = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    }).then(
        (sauce) => {
            res.status(200).json(sauce);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

// #endregion Récupétation des sauces

// #region Modification des sauces
const modifySauce = (req, res, next) => {
    const sauceObject = req.file
        ? {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        }
        : { ...req.body };
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};
// #endregion Modification des sauces

// #region Systeme de like


const likeSauce = (req, res) => {
    const userId = req.auth.userId;
    const like = req.body.like;

    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (like === 1) {
                if (!sauce.usersLiked.includes(userId)) {
                    sauce.usersLiked.push(userId);
                }

                const index = sauce.usersDisliked.indexOf(userId);
                if (index !== -1) {
                    sauce.usersDisliked.splice(index, 1);
                }
            } else if (like === -1) {
                if (!sauce.usersDisliked.includes(userId)) {
                    sauce.usersDisliked.push(userId);
                }

                const index = sauce.usersLiked.indexOf(userId);
                if (index !== -1) {
                    sauce.usersLiked.splice(index, 1);
                }
            } else if (like === 0) {

                const indexLiked = sauce.usersLiked.indexOf(userId);
                if (indexLiked !== -1) {
                    sauce.usersLiked.splice(indexLiked, 1);
                }
                const indexDisliked = sauce.usersDisliked.indexOf(userId);
                if (indexDisliked !== -1) {
                    sauce.usersDisliked.splice(indexDisliked, 1);
                }
            }

            sauce.likes = sauce.usersLiked.length;
            sauce.dislikes = sauce.usersDisliked.length;

            sauce.save()
                .then(() => {
                    res.status(200).json({ message: "Like/Dislike enregistré !" });
                })
                .catch((error) => {
                    res.status(400).json({ error });
                });
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};

// #endregion Systeme de like

// #region Exportation des modules
module.exports = {
    sauceCreate,
    showSauce,
    modifySauce,
    deleteSauce,
    id,
    likeSauce,
};

// #endregion Exportation des modules