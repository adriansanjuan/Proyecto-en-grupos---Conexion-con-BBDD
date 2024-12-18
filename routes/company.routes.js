const companyController = require("../controllers/company.controller") // Importa el controlador de company
const express = require("express") // Importamos Express
const company = require("../models/company.model")
const router = express.Router() // Crea un enrutador para las rutas de company

//POST
router.get("/SSR/new", companyController.showNewCompany)
router.post("/SSR", companyController.createCompany)

//GET
router.get("/SSR", companyController.findAllCompanies)
router.get("/SSR/:id", companyController.findAllCompaniesById)

//PATCH
router.get("/SSR/edit/:id", companyController.showEditCompany)
router.patch("/SSR/:id", companyController.editCompany)

//DELETE
router.delete("/SSR/:id", companyController.deleteCompany)

//---------CSR---------
//POST
/**
 * @swagger
 * /api/v2/company:
 *      post:
 *          sumary: Crea una nueva compañia
 *          tags: [Company]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Company'
 *          responses:
 *              200:
 *                  description: Compañia creada
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Error'
 */
router.post("/CSR", companyController.createCompanyJSON)

//GET
/**
 * @swagger
 * /api/v2/company:
 *      get:
 *          summary: Devuelve el listado de compañias
 *          tags: [Compañias]
 *          responses:
 *              200:
 *                  description: Listado de compañias
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Company'
 *              500:
 *                  description: Error devuelto
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Error'
 */
router.get("/CSR", companyController.findAllCompaniesJSON)

/**
 * @swagger
 * /api/v2/company/{id}:
 *      get:
 *          summary: Devuelve una compañia
 *          tags: [Compañias]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: El ID de la compañia _id Mongo
 *          responses:
 *              200:
 *                  description: Devuelvo la compañia
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object 
 *                              $ref: '#/components/schemas/Company'
 *              404:
 *                  description: Not Found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Error'
 */
router.get("/CSR/:id", companyController.findAllCompaniesByIdJSON)

//PATCH
/**
 * @swagger
 * /api/v2/company/{id}:
 *      patch:
 *          summary: Edita una compañia existente
 *          tags: [Compañias]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: El ID de la compañia _id Mongo
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Company'
 *          responses:
 *              200:
 *                  description: Compañia editada
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object 
 *                              $ref: '#/components/schemas/Company'
 *              400:
 *                  description: Bad Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Error'
 */
router.patch("/CSR/:id", companyController.editCompanyJSON)

//DELETE
/**
 * @swagger
 * /api/v2/company/{id}:
 *      delete:
 *          summary: Elimina una compañia
 *          tags: [Compañias]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: El ID del compañia _id Mongo
 *          responses:
 *              200:
 *                  description: Devuelvo el compañia eliminado
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object 
 *                              $ref: '#/components/schemas/Company'
 *              400:
 *                  description: Bad Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Error'
 */
router.delete("/CSR/:id", companyController.deleteCompanyJSON)

module.exports = router // Exporta el enrutador para su uso en la aplicación principal