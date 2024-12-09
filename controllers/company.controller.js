require("dotenv").config()
const companyModel = require("../models/company.model")


exports.findAllCompanies = async(req, res) => {
    await companyModel.findAll({}, function(err, datosCompany){
        if(err){
            console.log(err)
            res.render("error.ejs", {err:err.error})
        }else{
            res.render("company/index.ejs", {empresas:datosCompany})
        }
    })
}

exports.findAllCompaniesById = async(req, res) => {
    const {id} = req.params

    await companyModel.findCompanyById(id, function(err, datosCompany){
        if(err){
            console.log(err)
            res.render("error.ejs", {err:err.error})
        }else{
            res.render("company/show.ejs", {datosCompany})
        }
    })
}

exports.showNewCompany = (req, res) => {
    res.render("company/new.ejs")
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

exports.showEditCompany = async(req, res) => {
    const {id} = req.params

    await companyModel.findCompanyById(id, function(err, datosCompany){
        if(err){
            console.log(err)
            res.render("error.ejs", {err:err.error})
        }else{
            res.render("company/edit.ejs", {datosCompany})
        }
    })
}

exports.editCompany = async(req, res) => {
    const { id } = req.params
    const { type, ciudad, direccion, provincia, postal, tel, email, modifiedDate } = req.body
    const companyActualizado = {
        type: type,
        city: ciudad,
        adress: direccion,
        area: provincia,
        postalCode: postal,
        phone: tel,
        email: email,
        modifiedDate: modifiedDate
    }
    await companyModel.updateCompanyById(id, companyActualizado, function(err,datosActualizados){
        if(err){
            console.log("error")
            res.render("error.ejs", {err})
        }else{
            console.log(datosActualizados)
            res.redirect(`/api/${process.env.API}/company/${datosActualizados._id}`)
        }
    })        
}

exports.deleteCompany = async(req, res)=>{
    const {id} = req.params
    await companyModel.deleteCompanyById(id,function(err,datosEliminados){
        if(err){
            console.log("cagadom")
            res.render("error.ejs", {err})
        }else{
            res.redirect(`/api/${process.env.API}/company`)
        }
    })    
}