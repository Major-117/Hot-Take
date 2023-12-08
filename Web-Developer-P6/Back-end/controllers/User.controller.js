// #region Déclaration des variables 

const User = require("../models/User.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// #endregion Déclaration des variables 

// #region Création d'utilisateur 

const createUser = (req, res) =>{
    bcrypt.hash(req.body.password,10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            })
            user.save()
                .then(() => res.status(201).json({message: "Utilisateur créé !"}))
                .catch(error => res.status(400).json({error}))
        })
        .catch(error => res.status(500).json({error}))
};

// #endregion Création d'utilisateur 

// #region Connexion des utilisateurs 
const loginUser = (req, res)=>{
    User.findOne({email: req.body.email})
        .then(user=>{
            if(user === null){
                res.status(401).json({message:"Paire identifiant/mot de passe incorrecte"});
            }else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid =>{
                        if (!valid){
                            res.status(401).json({message:"Paire identifiant/mot de passe incorrecte"})
                        }else {
                            res.status(200).json({
                                userId: user._id,
                                token:jwt.sign(
                                    {userId: user._id},
                                    "RANDOM_TOKEN_SECRET",
                                    {expiresIn: "24h"}
                                )
                            });
                        }
                    })
                    .catch(error => res.status(500).json({error}));
            }
        })
        .catch(error => res.status(500).json({error}));
};

// #endregion Connexion des utilisateurs 

// #region Exportation des modules
module.exports={
    createUser,
    loginUser,
}

// #endregion Exportation des modules