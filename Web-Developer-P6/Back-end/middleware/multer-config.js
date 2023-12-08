// #region Déclaration des variables
const multer = require('multer');
// #endregion Déclaration des variables

// #region Gestion des types de fichier 
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};
// #endregion Gestion des types de fichier 

// #region Gestion de stockage des fichiers 
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

// #endregion Gestion de stockage des fichiers 

// #region Exportation des modules
module.exports = multer({storage: storage}).single('image');
// #endregion Exportation des modules