// #region Déclaration des variables
const jwt = require('jsonwebtoken');
// #endregion Déclaration des variables

// #region Middleware d'authentification
const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch(error) {
        res.status(401).json({ error: 'Authentification échouée' });
    }
};

// #endregion Middleware d'authentification

// #region Exportation des modules
module.exports ={
  auth,
}

// #endregion Exportation des modules