// #region Déclaration des variables

const express = require("express");
const port = 3000;
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const userRoute = require("./routes/User.Routes");
const sauceRoute = require("./routes/Sauce.Routes");

// #endregion Déclaration des variables

// #region Gestion de la connexion à la db
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connexion à la base de données réussie");
    })
    .catch((error) => {
        console.error("Erreur de connexion à la base de données :", error);
    });

// #endregion Gestion de la connexion à la db

// #region Gestion des app.use
app.use(express.json());



app.use("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next()
});

app.use("/", userRoute);
app.use("/", sauceRoute);
app.use("/images", express.static(path.join(__dirname, "images")));
app.listen(port, () =>{
    console.log(`Serveur lancé sur le port ${port}`);
});

// #endregion Gestion des app.use