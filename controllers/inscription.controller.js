require("dotenv").config()
const inscriptionModel = require("../models/inscription.model")

exports.createInscription = async(req,res)=>{
    await inscriptionModel.createInscription(req.body, function(err,inscriptionCreated){
        if(err){
            console.log(err)
            res.render("error.ejs", {err})
        }else{
            console.log(inscriptionCreated)
            res.redirect(`/api/${process.env.API}/inscription/`)
        }
    })
}

exports.showNewComment = (req,res)=>{
    res.render("inscription/new.ejs")
}

exports.findAllInscription = async(req,res) => {
    await inscriptionModel.findAllInscription({},function(err,datosInscription){
        if(err){            
            res.status(500).json({"err":err})
        }else{
            res.status(200).json(datosInscription)
        }
    })    
}


exports.showAllInscription = async(req,res) => {
    await inscriptionModel.findAllInscription(filtro,function(err,datosInscription){
        if(err){
            console.log(err)
            res.render("error.ejs",{err:err.error})
        }else{
            res.render("inscription/index.ejs",{datosInscription})
        }
    })    
}

exports.editInscription = async(req,res) => {
    const { id } = req.params
    const { IdUser, IdCompany, FecIni, FecFin, Observaciones } = req.body
    const inscriptionActualizado = {
        IdUser:IdUser,
        IdCompany:IdCompany,
        FecIni:FecIni,
        FecFin:FecFin,
        Observaciones:Observaciones
    }
    await inscriptionModel.updateInscriptionById(id,inscriptionActualizado,function(err,datosActualizados){
        if(err){
            res.render("error.ejs", {err})
        }else{
            console.log(datosActualizados)
            res.redirect(`/api/${process.env.API}/inscription/`)
        }
    })        
}

exports.deleteInscription = async(req,res)=>{
    const {id} = req.params
    await inscriptionModel.deleteInscriptionById(id,function(err,datosEliminados){
        if(err){
            res.render("error.ejs", {err})
        }else{
            res.redirect(`/api/${process.env.API}/inscription/`)
        }
    })    
}
