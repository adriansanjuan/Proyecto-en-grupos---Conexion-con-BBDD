const companyController = require("../controllers/company.controller") // Importa el controlador de company
const express = require("express") // Importamos Express
const company = require("../models/company.model")
const router = express.Router() // Crea un enrutador para las rutas de company

//POST
router.get("/new", companyController.showNewCompany)
router.post("/", companyController.createCompany)

//GET
router.get("/", companyController.findAllCompanies)
router.get("/:id", companyController.findAllCompaniesById)

//PATCH
router.get("/edit/:id", companyController.showEditCompany)
router.patch("/:id", companyController.editCompany)

//DELETE
router.delete("/:id", companyController.deleteCompany)

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