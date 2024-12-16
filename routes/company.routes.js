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
router.post("/CSR", companyController.createCompanyJSON)

//GET
router.get("/CSR", companyController.findAllCompaniesJSON)
router.get("/CSR/:id", companyController.findAllCompaniesByIdJSON)

//PATCH
router.patch("/CSR/:id", companyController.editCompanyJSON)

//DELETE
router.delete("/CSR/:id", companyController.deleteCompanyJSON)

module.exports = router // Exporta el enrutador para su uso en la aplicación principal