const usersController = require("../controllers/users.controller") // Importa el controlador de users
const express = require("express") // Importamos Express
const router = express.Router() // Crea un enrutador para las rutas de users

//GET
router.get("/new", usersController.newUser)
router.get("/:id", usersController.findUserById)
router.get("/", usersController.findAllUsers)
router.get("/edit/:id", usersController.modifyUser)
//POST
router.post("/",usersController.createUser)
//PATCH
router.patch("/:id",usersController.updateUser)
//DELETE
router.delete("/:id",usersController.deleteUserById)

//CSR
//GET
router.get("/CSR/new", usersControllerJSON.newUser)
router.get("/CSR/:id", usersControllerJSON.findUserById)
router.get("/CSR", usersControllerJSON.findAllUsers)
router.get("/CSR/edit/:id", usersControllerJSON.modifyUser)
//POST
router.post("/CSR",usersControllerJSON.createUser)
//PATCH
router.patch("/CSR/:id",usersControllerJSON.updateUser)
//DELETE
router.delete("/CSR/:id",usersControllerJSON.deleteUserById)

module.exports = router // Exporta el enrutador para su uso en la aplicación principal