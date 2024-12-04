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


exports.showAllInscription = async(req,res) => {
    await inscriptionModel.findAllInscription(function(err,datosInscription){
        if(err){
            console.log(err)
            res.render("error.ejs",{err:err.error})
        }else{
            res.render("inscription/index.ejs",{datosInscription})
        }
    })    
}

exports.showEditInscription = async(req, res) => {
    const { id } = req.params
    await inscriptionModel.findInscriptionById(id,function(err,inscription){
        if(err){
            res.render("error.ejs",{err:err.error})
        }else{
            res.render("inscription/edit.ejs", {inscription})
        }
    })  
}

exports.editInscription = async(req,res) => {
    const { id } = req.params
    const { FecIni, FecFin, Observaciones } = req.body
    const inscriptionActualizado = {
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
