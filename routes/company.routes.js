const companyController = require("../controllers/company.controller") // Importa el controlador de company
const express = require("express") // Importamos Express
const company = require("../models/company.model")
const router = express.Router() // Crea un enrutador para las rutas de company

//GET
router.get("/", companyController.findAllCompanies)
router.get("/:id", companyController.findAllCompaniesById)

//POST
router.get("/new", companyController.showNewCompany)
router.post("/", companyController.createCompany)

//PATCH
router.get("/edit/:id", companyController.showEditCompany)
router.patch("/:id", companyController.editCompany)

//DELETE
router.delete("/:id", companyController.deleteCompany)

module.exports = router // Exporta el enrutador para su uso en la aplicación principal