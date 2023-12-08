// #region Déclaration des variables 
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
// #endregion 

// #region Models d'utilisateur 
const userShema = new mongoose.Schema({
    email : {type: String , unique:true},
    password : {type: String}
});

// #endregion Models d'utilisateur 

// #region Plugin uniqueValidator
userShema.plugin(uniqueValidator);
// #endregion Plugin uniqueValidator

// #region Exportation des modules
module.exports = mongoose.model("User", userShema);
// #endregion Exportation des modeules