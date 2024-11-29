const inscriptionController = require("../controllers/inscription.controller") // Importa el controlador de inscription
const express = require("express") // Importamos Express
const router = express.Router() // Crea un enrutador para las rutas de inscription

//GET

//Mostrar JSON del listado de comentarios
router.get("/inscription/json",inscriptionController.findAllInscription)

//Mostrar VISTA EJS index.ejs con listado de todo inscription
router.get("/",inscriptionController.showAllInscription)
router.get("/inscription",inscriptionController.showAllInscription)

//Mostrar VISTA EJS new.ejs para crear un inscription
router.get("/inscription/new",inscriptionController.showNewComment)

//POST

router.post("/inscription",inscriptionController.createInscription)

//PATCH

router.patch("/inscription/:id",inscriptionController.editInscription)

//DELETE

router.delete("/inscription/:id",inscriptionController.deleteInscription)

module.exports = router // Exporta el enrutador para su uso en la aplicación principal