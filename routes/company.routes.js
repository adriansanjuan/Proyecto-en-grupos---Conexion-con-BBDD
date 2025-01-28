const companyController = require("../controllers/company.controller") // Importa el controlador de company
const express = require("express") // Importamos Express
const company = require("../models/company.model")
const router = express.Router() // Crea un enrutador para las rutas de company
const jwtMW = require("../middleware/jwt.mw")

//POST
router.get("/SSR/new",jwtMW.authenticate, companyController.showNewCompany)
router.post("/SSR",jwtMW.authenticate, companyController.createCompany)

//GET
router.get("/SSR",jwtMW.authenticate, companyController.findAllCompanies)
router.get("/SSR/:id",jwtMW.authenticate, companyController.findAllCompaniesById)

//PATCH
router.get("/SSR/edit/:id",jwtMW.authenticate, companyController.showEditCompany)
router.patch("/SSR/:id",jwtMW.authenticate, companyController.editCompany)

//DELETE
router.delete("/SSR/:id",jwtMW.authenticate, companyController.deleteCompany)

//---------CSR---------
/**
 * @swagger
 * components:
 *      schemas:
 *          Company:
 *              type: object
 *              required:
 *                  - cif
 *                  - name
 *                  - city
 *                  - personInCharge
 *                  - personInChargeID
 *                  - type
 *                  - address
 *                  - area
 *                  - postalCode
 *                  - phone
 *                  - email
 *                  - createDate
 *                  - modifiedDate
 *              properties:
 *                  _id:
 *                      type: string
 *                      description: UUID autogenerado por Mongo
 *                  cif:
 *                      type: string
 *                      description: Cif de la compañia
 *                  name:
 *                      type: string
 *                      description: Nombre de la compañia
 *                  city:
 *                      type: string
 *                      description: Ciudad donde se localiza la compañia
 *                  personInCharge:
 *                      type: integer
 *                      description: Nombre de la persona a cargo
 *                  personInChargeID:
 *                      type: string
 *                      description: UUID de la persona a cargo
 *                  type:
 *                      type: string
 *                      description: Tipo de compañia
 *                  address:
 *                      type: string
 *                      description: Direccion de la compañia
 *                  area:
 *                      type: string
 *                      description: Comunidad autonoma
 *                  postalCode:
 *                      type: number
 *                      description: Codigo postal
 *                  phone:
 *                      type: number
 *                      description: Numero de telefono
 *                  email:
 *                      type: string
 *                      description: Email de la compañía
 *                  createDate:
 *                      type: string
 *                      description: Fecha de creación
 *                  modifiedDate:
 *                      type: string
 *                      description: Fecha de modificacion
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
 *      name: Company
 *      description: El API de gestión de Company
 */

//POST
/**
 * @swagger
 * /api/v2/company/CSR:
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
 * /api/v2/company/CSR:
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
 * /api/v2/company/CSR/{id}:
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
 * /api/v2/company/CSR/{id}:
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
 * /api/v2/company/CSR/{id}:
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