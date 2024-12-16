const inscriptionController = require("../controllers/inscription.controller") // Importa el controlador de inscription
const express = require("express") // Importamos Express
const router = express.Router() // Crea un enrutador para las rutas de inscription

//GET

//Mostrar VISTA EJS index.ejs con listado de todo inscription
router.get("/",inscriptionController.showAllInscription)

//POST
//Mostrar VISTA EJS new.ejs para crear un inscription
router.get("/new",inscriptionController.showNewInscription)
router.post("/",inscriptionController.createInscription)

//PATCH
router.get("/edit/:id", inscriptionController.showEditInscription)
router.patch("/:id",inscriptionController.editInscription)

//DELETE
router.delete("/:id",inscriptionController.deleteInscription)

//CSR
//GET

//Mostrar VISTA EJS index.ejs con listado de todo inscription
router.get("/CSR",inscriptionController.showAllInscriptionCSR)

//POST
//Mostrar VISTA EJS new.ejs para crear un inscription
router.get("/CSR/new",inscriptionController.showNewInscriptionCSR)
router.post("/CSR",inscriptionControllerCSR.createInscriptionCSR)

//PATCH
router.get("/CSR/edit/:id", inscriptionController.showEditInscriptionCSR)
router.patch("/CSR/:id",inscriptionController.editInscriptionCSR)

//DELETE
router.delete("/CSR/:id",inscriptionController.deleteInscriptionCSR)

module.exports = router // Exporta el enrutador para su uso en la aplicación principal