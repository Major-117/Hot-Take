// #region Déclaration des variables
const express = require("express");
const router = express.Router();
const hotTakeController = require("../controllers/User.controller");
// #endregion Déclaration des variables

// #region Gestion des routes d'utilisateur 
router.post("/api/auth/signup", hotTakeController.createUser);
router.post('/api/auth/login', hotTakeController.loginUser);
// #endregion Gestion des routes d'utilisateur 

// #region Exportation des modules
module.exports = router;
// #endregion Exportation des modules




