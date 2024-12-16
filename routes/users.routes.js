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
router.get("/CSR/:id", usersController.findUserByIdJSON)
router.get("/CSR", usersController.findAllUsersJSON)
//POST
router.post("/CSR",usersController.createUserJSON)
//PATCH
router.patch("/CSR/:id",usersController.updateUserJSON)
//DELETE
router.delete("/CSR/:id",usersController.deleteUserByIdJSON)

module.exports = router // Exporta el enrutador para su uso en la aplicación principal