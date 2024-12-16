const usersController = require("../controllers/users.controller") // Importa el controlador de users
const express = require("express") // Importamos Express
const router = express.Router() // Crea un enrutador para las rutas de users

//GET
router.get("/SSR/new", usersController.newUser)
router.get("/SSR/:id", usersController.findUserById)
router.get("/SSR", usersController.findAllUsers)
router.get("/SSR/edit/:id", usersController.modifyUser)
//POST
router.post("/SSR",usersController.createUser)
//PATCH
router.patch("/SSR/:id",usersController.updateUser)
//DELETE
router.delete("/SSR/:id",usersController.deleteUserById)

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