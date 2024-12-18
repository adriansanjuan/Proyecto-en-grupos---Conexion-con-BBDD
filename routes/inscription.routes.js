const inscriptionController = require("../controllers/inscription.controller") // Importa el controlador de inscription
const express = require("express") // Importamos Express
const router = express.Router() // Crea un enrutador para las rutas de inscription

//GET

//Mostrar VISTA EJS index.ejs con listado de todo inscription
router.get("/SSR",inscriptionController.showAllInscription)

//POST
//Mostrar VISTA EJS new.ejs para crear un inscription
router.get("/SSR/new",inscriptionController.showNewInscription)
router.post("/SSR",inscriptionController.createInscription)

//PATCH
router.get("/SSR/edit/:id", inscriptionController.showEditInscription)
router.patch("/SSR/:id",inscriptionController.editInscription)

//DELETE
router.delete("/SSR/:id",inscriptionController.deleteInscription)

//CSR
//GET
/**
 * @swagger
 * /api/v2/inscription:
 *      get:
 *          summary: Devuelve el listado de inscripciones
 *          tags: [Inscription]
 *          responses:
 *              200:
 *                  description: Listado de comentarios
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Inscription'
 *              500:
 *                  description: Error devuelto
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Error'
 */
router.get("/CSR",inscriptionController.showAllInscriptionCSR)

//POST
/**
 * @swagger
 * /api/v2/inscription:
 *      post:
 *          summary: Crea una nueva inscripción
 *          tags: [Inscripcion]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Inscription'
 *          responses:
 *              200:
 *                  description: Inscripción creada
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object 
 *                              $ref: '#/components/schemas/Inscription'
 *              400:
 *                  description: Bad Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Error'
 */
router.post("/CSR",inscriptionController.createInscriptionCSR)

//PATCH
/**
 * @swagger
 * /api/v2/inscription/{id}:
 *      patch:
 *          summary: Edita una inscripción existente
 *          tags: [Inscripcion]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: El ID de la inscripción UUID / _id Mongo
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Inscription'
 *          responses:
 *              200:
 *                  description: Inscripción editado
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object 
 *                              $ref: '#/components/schemas/Inscription'
 *              400:
 *                  description: Bad Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Error'
 */
router.patch("/CSR/:id",inscriptionController.editInscriptionCSR)

//DELETE
/**
 * @swagger
 * /api/v2/inscription/{id}:
 *      delete:
 *          summary: Elimina una inscripción
 *          tags: [Inscripcion]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: El ID de la inscripción UUID / _id Mongo
 *          responses:
 *              200:
 *                  description: Devuelvo la inscripción eliminada
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object 
 *                              $ref: '#/components/schemas/Inscription'
 *              400:
 *                  description: Bad Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Error'
 */
router.delete("/CSR/:id",inscriptionController.deleteInscriptionCSR)

module.exports = router // Exporta el enrutador para su uso en la aplicación principal