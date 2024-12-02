const usersController = require("../controllers/users.controller") // Importa el controlador de users
const express = require("express") // Importamos Express
const router = express.Router() // Crea un enrutador para las rutas de users

//GET
router.get("/",usersController.findAllUsers)
router.get("/:id",usersController.findUserById)
//POST
router.post("/",usersController.createUser)
//PATCH
router.patch("/:id",usersController.updateUser)
//DELETE
router.delete("/:id",usersController.deleteUserById)

module.exports = router // Exporta el enrutador para su uso en la aplicación principal