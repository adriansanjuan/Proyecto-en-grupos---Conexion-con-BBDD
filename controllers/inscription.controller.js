require("dotenv").config()//Importa y configura las variables de entorno
const inscriptionModel = require("../models/inscription.model")//Importa el modelo de inscripción

exports.createInscription = async(req,res)=>{//Función para crear una nueva inscripción
    await inscriptionModel.createInscription(req.body, function(err,inscriptionCreated){//Llama al método del modelo para crear
        if(err){//Si hay error
            console.log(err)//Muestra el error en consola
            res.render("error.ejs", {err})//Renderiza página de error
        }else{//Si no hay error
            console.log(inscriptionCreated)//Muestra la inscripción creada
            res.redirect(`/api/${process.env.API}/inscription/SSR`)//Redirecciona al listado
        }
    })
}

exports.showNewInscription = async(req,res)=>{//Función muestra las nuevas inscripciones
    const companyModel = require("../models/company.model")//Extrae el contenido del modelo
    const userModel = require("../models/users.model")//Extrae el contenido del modelo
    
    const companies = await companyModel.find({})//Crea la constante con el contenido del companyModel
    await userModel.findAll(function(err, users) {//Llama al método del modelo para encontrar todos los usuarios
        if(err) {//Si hay error
            res.render("error.ejs", {err})//Renderiza página de error
        } else {//Si no hay error
            res.render("inscription/new.ejs", { companies, users })//Renderiza el formulario de nueva inscripción
        }
    })
}

exports.showAllInscription = async(req,res) => {//Función para mostrar todas las inscripciones
    await inscriptionModel.findAllInscription(async function(err,datosInscription){//Llama al método del modelo para encontrar todas las inscripciones
        if(err){//Si hay error
            console.log(err)//Muestra el error en consola
            res.render("error.ejs",{err:err.error})//Renderiza página de error
        }else{//Si no hay error
            const companyModel = require("../models/company.model")//Extrae el contenido del modelo
            const userModel = require("../models/users.model")//Extrae el contenido del modelo
            const companies = await companyModel.find({})//Crea la constante con el contenido del companyModel
            
            await userModel.findAll(function(err, users) {//Llama al método del modelo para encontrar todos los usuarios
                if(err) {//Si hay error
                    res.render("error.ejs", {err})//Renderiza página de error
                } else {//Si no hay error
                    res.render("inscription/index.ejs",{datosInscription,companies,users})//Renderiza página que muestra todas las inscripciones
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
            const companyModel = require("../models/company.model")//Extrae el contenido del modelo
            const userModel = require("../models/users.model")//Extrae el contenido del modelo
            const companies = await companyModel.find({})//Crea la constante con el contenido del companyModel
            await userModel.findAll(function(err, users) {//Llama al método del modelo para encontrar todos los usuarios
                if(err) {//Si hay error
                    res.render("error.ejs", {err})//Renderiza página de error
                } else {//Si no hay error
                    res.render("inscription/edit.ejs",{inscription,companies,users})//Renderiza el formulario de edición
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
            res.redirect(`/api/${process.env.API}/inscription/SSR`)//Redirecciona al listado
        }
    })        
}

exports.deleteInscription = async(req,res)=>{//Función para eliminar una inscripción
    const {id} = req.params//Obtiene el ID de los parámetros
    await inscriptionModel.deleteInscriptionById(id,function(err,datosEliminados){//Elimina de la base de datos
        if(err){//Si hay error
            res.render("error.ejs", {err})//Renderiza página de error
        }else{//Si no hay error
            res.redirect(`/api/${process.env.API}/inscription/SSR`)//Redirecciona al listado
        }
    })    
}


//CSR

exports.findAllInscriptionCSR = async(req,res) => {
    //CSR
    await inscriptionModel.findAllInscription(async function(err,datosInscription){
        if(err){            
            res.status(500).json({"err":err})
        }else{
            res.status(200).json(datosInscription)
        }
    })    
}

exports.createInscriptionCSR = async(req,res)=>{    
    await inscriptionModel.createInscription(req.body, function(err,inscriptionCreated){
        if(err){            
            res.status(400).json(err)
        }else{            
            res.status(200).json(inscriptionCreated)
        }
    })
}

exports.editInscriptionCSR = async(req,res) => {
    const { id } = req.params//Obtiene el ID de los parámetros
    const { FecIni, FecFin, Observaciones, IdUser, IdCompany } = req.body//Extrae datos del cuerpo
    const inscriptionActualizado = {//Crea objeto con datos actualizados
        FecIni,//Fecha inicio
        FecFin,//Fecha fin
        Observaciones,//Observaciones
        IdUser,//ID del usuario
        IdCompany//ID de la compañía
    }
    await inscriptionModel.updateInscriptionById(id,inscriptionActualizado,function(err,datosActualizados){
        if(err){            
            res.status(400).json(err)
        }else{            
            res.status(200).json(inscriptionActualizado)
        }
    })        
}

exports.deleteInscriptionCSR = async(req,res)=>{
    const {id} = req.params    
    await inscriptionModel.deleteInscriptionById(id,function(err,datosEliminados){
        if(err){
            res.status(400).json(err)
        }else{
            res.status(200).json(datosEliminados)
        }
    })    
}