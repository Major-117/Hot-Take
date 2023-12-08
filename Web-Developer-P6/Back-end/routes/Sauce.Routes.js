// #region Déclaration des variables
const express = require("express");
const router = express.Router();
const sauceController = require("../controllers/Sauce.Controllers");
const multer = require("../middleware/multer-config")
const auth = require("../middleware/auth");
// #endregion Déclaration des variables

// #region Gestion des routes sauces
router.post("/api/sauces",auth.auth, multer, sauceController.sauceCreate);
router.get("/api/sauces", auth.auth, sauceController.showSauce);
router.delete("/api/sauces/:id", auth.auth, sauceController.deleteSauce);
router.put("/api/sauces/:id", auth.auth, multer,sauceController.modifySauce);
router.get("/api/sauces/:id", auth.auth,sauceController.id);
router.post("/api/sauces/:id/like", auth.auth, sauceController.likeSauce);
// #endregion Gestion des routes sauces

// #region Exportation des modules
module.exports = router;
// #endregion Exportation des modules
