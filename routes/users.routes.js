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
/**
 * @swagger
 * /api/v2/users/{id}:
 *      get:
 *          summary: Devuelve un usuario
 *          tags: [Usuarios]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: El ID del usuario UUID
 *          responses:
 *              200:
 *                  description: Devuelvo el usuario
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object 
 *                              $ref: '#/components/schemas/Users'
 *              404:
 *                  description: Not Found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Error'
 */
router.get("/CSR/:id", usersController.findUserByIdJSON)

/**
 * @swagger
 * /api/v2/users:
 *      get:
 *          summary: Devuelve el listado de usuarios
 *          tags: [Usuarios]
 *          responses:
 *              200:
 *                  description: Listado de usuario
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Users'
 *              500:
 *                  description: Error devuelto
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Error'
 */
router.get("/CSR", usersController.findAllUsersJSON)

//POST
/**
 * @swagger
 * /api/v2/users:
 *      post:
 *          summary: Crea un nuevo usuario
 *          tags: [Usuarios]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Users'
 *          responses:
 *              200:
 *                  description: Usuario creado
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object 
 *                              $ref: '#/components/schemas/Users'
 *              400:
 *                  description: Bad Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Error'
 */
router.post("/CSR",usersController.createUserJSON)

//PATCH
/**
 * @swagger
 * /api/v2/users/{id}:
 *      patch:
 *          summary: Edita un usuario existente
 *          tags: [Usuarios]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: El ID del usuario UUID
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Users'
 *          responses:
 *              200:
 *                  description: Usuario editado
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object 
 *                              $ref: '#/components/schemas/Users'
 *              400:
 *                  description: Bad Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Error'
 */
router.patch("/CSR/:id",usersController.updateUserJSON)

//DELETE
/**
 * @swagger
 * /api/v2/users/{id}:
 *      delete:
 *          summary: Elimina un usuario
 *          tags: [Usuarios]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: El ID del usuario UUID
 *          responses:
 *              200:
 *                  description: Devuelvo el usuario eliminado
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object 
 *                              $ref: '#/components/schemas/Users'
 *              400:
 *                  description: Bad Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Error'
 */
router.delete("/CSR/:id",usersController.deleteUserByIdJSON)

module.exports = router // Exporta el enrutador para su uso en la aplicación principal