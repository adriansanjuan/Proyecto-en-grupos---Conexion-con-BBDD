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
/**
 * @swagger
 * components:
 *      schemas:
 *          Inscription:
 *              type: object
 *              required:
 *                  - IdUser
 *                  - IdCompany
 *                  - FecIni
 *                  - FecFin
 *                  - Observaciones
 *              properties:
 *                  IdUser:
 *                      type: number
 *                      description: UUID de MySQL autoincremental
 *                  IdCompany:
 *                      type: string
 *                      description: ID de MongoDB automatica
 *                  FecIni:
 *                      type: string
 *                      description: Fecha de inicio
 *                  FecFin:
 *                      type: string
 *                      description: Fecha final
 *                  Observaciones:
 *                      type: string
 *                      description: Observaciones de la inscripcion
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
 *      name: Inscription
 *      description: El API de Inscription
 */

//GET
/**
 * @swagger
 * /api/v2/inscription/CSR:
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
router.get("/CSR",inscriptionController.findAllInscriptionCSR)

//POST
/**
 * @swagger
 * /api/v2/inscription/CSR:
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
 * /api/v2/inscription/CSR/{id}:
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
 * /api/v2/inscription/CSR/{id}:
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