// #region Déclaration des variables
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
// #endregion Déclaration des variables

// #region Models de création de sauce
const sauceCreates = new mongoose.Schema({
    userId: {type:String},
    name: {type:String},
    manufacturer: {type:String},
    description: {type: String},
    mainPepper:{type: String},
    imageUrl: {type: String},
    heat: {type: Number, min:1, max:10},
    likes: {type: Number, default:0},
    dislikes: {type: Number,default:0},
    usersLiked: [{ type: String }],
    usersDisliked: [{ type: String }]
});

// #endregion Models de création de sauce

// #region Plugin uniqueValidator
sauceCreates.plugin(uniqueValidator);
// #endregion Plugin uniqueValidator

// #region Exporation des modules
module.exports = mongoose.model("Sauce", sauceCreates);
// #endregion Exportation des modules