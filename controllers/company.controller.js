require("dotenv").config()
const companyModel = require("../models/company.model")

exports.findAllComments = async(req,res) => {
    await companyModel.findAll({},function(err, datosComany){
        if(err){
            res.status(500).json({"err":err})
        }else{
            res.status(200).json(datosCompany)
        }
    })
}