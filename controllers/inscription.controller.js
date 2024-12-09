require("dotenv").config()//Importa y configura las variables de entorno
const inscriptionModel = require("../models/inscription.model")//Importa el modelo de inscripción

exports.createInscription = async(req,res)=>{//Función para crear una nueva inscripción
    await inscriptionModel.createInscription(req.body, function(err,inscriptionCreated){//Llama al método del modelo para crear
        if(err){//Si hay error
            console.log(err)//Muestra el error en consola
            res.render("error.ejs", {err})//Renderiza página de error
        }else{//Si no hay error
            console.log(inscriptionCreated)//Muestra la inscripción creada
            res.redirect(`/api/${process.env.API}/inscription/`)//Redirecciona al listado
        }
    })
}

exports.showNewInscription = async(req,res)=>{
    const companyModel = require("../models/company.model")
    const userModel = require("../models/users.model")
    
    const companies = await companyModel.find({})
    await userModel.findAll(function(err, users) {
        if(err) {
            res.render("error.ejs", {err})
        } else {
            res.render("inscription/new.ejs", { companies, users })
        }
    })
}

exports.showAllInscription = async(req,res) => {
    await inscriptionModel.findAllInscription(async function(err,datosInscription){
        if(err){
            console.log(err)
            res.render("error.ejs",{err:err.error})
        }else{
            const companyModel = require("../models/company.model")
            const userModel = require("../models/users.model")
            const companies = await companyModel.find({})
            
            await userModel.findAll(function(err, users) {
                if(err) {
                    res.render("error.ejs", {err})
                } else {
                    res.render("inscription/index.ejs",{datosInscription,companies,users})
                }
            })
        }
    })    
}

exports.showEditInscription = async(req, res) => {//Función para mostrar formulario de edición
    const { id } = req.params//Obtiene el ID de los parámetros
    await inscriptionModel.findInscriptionById(id, async function(err,inscription){//Busca la inscripción por ID
        if(err){//Si hay error
            res.render("error.ejs",{err:err.error})//Renderiza página de error
        }else{//Si no hay error
            const companyModel = require("../models/company.model")
            const userModel = require("../models/users.model")
            const companies = await companyModel.find({})
            await userModel.findAll(function(err, users) {
                if(err) {
                    res.render("error.ejs", {err})
                } else {
                    res.render("inscription/edit.ejs",{inscription,companies,users})
                }
            })
        }
    })  
}

exports.editInscription = async(req,res) => {//Función para editar una inscripción
    const { id } = req.params//Obtiene el ID de los parámetros
    const { FecIni, FecFin, Observaciones, IdUser, IdCompany } = req.body//Extrae datos del cuerpo
    const inscriptionActualizado = {//Crea objeto con datos actualizados
        FecIni,//Fecha inicio
        FecFin,//Fecha fin
        Observaciones,//Observaciones
        IdUser,//ID del usuario
        IdCompany//ID de la compañía
    }
    await inscriptionModel.updateInscriptionById(id,inscriptionActualizado,function(err,datosActualizados){//Actualiza en la base de datos
        if(err){//Si hay error
            res.render("error.ejs", {err})//Renderiza página de error
        }else{//Si no hay error
            console.log(datosActualizados)//Muestra datos actualizados
            res.redirect(`/api/${process.env.API}/inscription/`)//Redirecciona al listado
        }
    })        
}

exports.deleteInscription = async(req,res)=>{//Función para eliminar una inscripción
    const {id} = req.params//Obtiene el ID de los parámetros
    await inscriptionModel.deleteInscriptionById(id,function(err,datosEliminados){//Elimina de la base de datos
        if(err){//Si hay error
            res.render("error.ejs", {err})//Renderiza página de error
        }else{//Si no hay error
            res.redirect(`/api/${process.env.API}/inscription/`)//Redirecciona al listado
        }
    })    
}
