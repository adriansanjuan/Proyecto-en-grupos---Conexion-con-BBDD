require("dotenv").config()
const companyModel = require("../models/company.model")


exports.findAllCompanies = async(req, res) => {
    await companyModel.findAll({}, function(err, datosCompany){
        if(err){
            console.log(err)
            res.render("error.ejs", {err:err.error})
        }else{
            res.render("/company/index.ejs", {empresas:datosCompany})
        }
    })
}

exports.findAllCompaniesById = async(req, res) => {
    await companyModel.findCompanyById(id, function(err, datosCompany){
        if(err){
            console.log(err)
            res.render("error.ejs", {err:err.error})
        }else{
            res.render("/company/index.ejs", {empresas:datosCompany})
        }
    })
}

exports.showNewCompany = (req, res) => {
    res.render("/company/new.ejs")
}

exports.createCompany = async(req, res) => {
    await companyModel.createCompany(req.body, function(err, companyCreated){
        if(err){
            console.log(err)
            res.render("error.ejs", {err})
        }else{
            console.log(companyCreated)
            res.redirect(`/api/${process.env.API}/company/`)
        }
    })
}

exports.showEditCompany = (req, res) => {
    res.render("/company/edit.ejs")
}

exports.editCompany = async(req, res) => {
    const { id } = req.params
    const { Adress, Area, PostalCode, Phone, Email } = req.body
    const inscriptionActualizado = {
        address:Adress,
        area:Area,
        postalCode:PostalCode,
        phone:Phone,
        email:Email
    }
    await companyModel.updateCompanyById(id, companyData, function(err,datosActualizados){
        if(err){
            res.render("error.ejs", {err})
        }else{
            console.log(datosActualizados)
            res.redirect(`/api/${process.env.API}/inscription/`)
        }
    })        
}

exports.deleteCompany = async(req, res)=>{
    const {id} = req.params
    await companyModell.deleteCompanyById(id,function(err,datosEliminados){
        if(err){
            res.render("error.ejs", {err})
        }else{
            res.redirect(`/api/${process.env.API}/inscription/`)
        }
    })    
}