require("dotenv").config()
const companyModel = require("../models/company.model")

exports.findAllCompaniesCSR = async(req,res) => {
    await companyModel.findAll({},function(err, datosComany){
        if(err){
            res.status(500).json({"err":err})
        }else{
            res.status(200).json(datosCompany)
        }
    })
}

exports.findAllCompaniesSSR = async(req, res) => {
    await companyModel.findAll(filtro, function(err, datosCompany){
        if(err){
            console.log(err)
            res.render("error.ejs", {err:err.error})
        }else{
            res.render("../views/company/index.ejs", {comentarios:datosCompany})
        }
    })
}

exports.showNewCompany = async(req, res) => {
    const {id} = req.params
}