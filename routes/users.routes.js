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
/**
 * @swagger
 * components:
 *      schemas:
 *          Users:
 *              type: object
 *              required:
 *                  - username
 *                  - password
 *                  - firstName
 *                  - lastName
 *                  - createdDate
 *                  - modifiedDate
 *                  - email
 *                  - picture
 *                  - profile
 *              properties:
 *                  Id:
 *                      type: int
 *                      description: UUID de MySQL autoincremental
 *                  username:
 *                      type: string
 *                      description: Nombre de usuario
 *                  password:
 *                      type: string
 *                      description: Contraseña del usuario
 *                  firstName:
 *                      type: string
 *                      description: Nombre del usuario
 *                  lastName:
 *                      type: string
 *                      description: Apellido del usuario
 *                  createdDate:
 *                      type: string
 *                      description: Fecha de creacion
 *                  modifiedDate:
 *                      type: string
 *                      description: Fecha modificada
 *                  email:
 *                      type: string
 *                      description: Email del usuario
 *                  picture:
 *                      type: string
 *                      description: Foto del usuario
 *                  profile:
 *                      type: string
 *                      description: Rol de usuario
 *          Error:
 *              type: object
 *              properties:
 *                  err:
 *                      type: string
 *                      description: Descripción del error
 *              example:
 *                  err: No hay datos disponibles
 *                      
 */

/**
 * @swagger
 * tags:
 *      name: Users
 *      description: El API de Users
 */

//GET
/**
 * @swagger
 * /api/v2/users/CSR/{id}:
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
 * /api/v2/users/CSR:
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
 * /api/v2/users/CSR:
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
 * /api/v2/users/CSR/{id}:
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
 * /api/v2/users/CSR/{id}:
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