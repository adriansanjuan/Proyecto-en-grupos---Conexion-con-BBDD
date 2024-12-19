require("dotenv").config()//Importa y configura las variables de entorno
const companyModel = require("../models/company.model")//Importa el modelo de company


exports.findAllCompanies = async(req, res) => {//Función que muestra todas las compañias
    await companyModel.findAll({}, function(err, datosCompany){
        if(err){//Si hay error
            console.log(err)//Muestra el error en consola
            res.render("error.ejs", {err:err.error})//Renderiza página de error
        }else{//Si no hay error
            res.render("company/index.ejs", {empresas:datosCompany})//Renderiza la página que muestra todas las compañias
        }
    })
}

exports.findAllCompaniesById = async(req, res) => {//Función que muestra las compañias por id
    const {id} = req.params

    await companyModel.findCompanyById(id, function(err, datosCompany){
        if(err){//Si hay error
            console.log(err)//Muestra el error en consola
            res.render("error.ejs", {err:err.error})//Renderiza página de error
        }else{//Si no hay error
            res.render("company/show.ejs", {datosCompany})//Renderiza página de inicio
        }
    })
}

exports.showNewCompany = (req, res) => {//Función que redirige al formulario de creación
    res.render("company/new.ejs")//Renderiza el formulario de la nueva compañía
}

exports.createCompany = async(req, res) => {//Función que crea la nueva compañía
    await companyModel.createCompany(req.body, function(err, companyCreated){
        if(err){//Si hay error
            console.log(err)//Muestra el error en consola
            res.render("error.ejs", {err})//Renderiza página de error
        }else{//Si no hay error
            console.log(companyCreated)//Muestra los datos de la nueva compañía
            res.redirect(`/api/${process.env.API}/company/SSRSSR`)//Redirecciona al listado
        }
    })
}

exports.showEditCompany = async(req, res) => {//Función que redirige al formulario de eledición
    const {id} = req.params

    await companyModel.findCompanyById(id, function(err, datosCompany){
        if(err){//Si hay error
            console.log(err)//Muestra el error en consola
            res.render("error.ejs", {err:err.error})//Renderiza página de error
        }else{//Si no hay error
            res.render("company/edit.ejs", {datosCompany})//Renderiza el formulario de edición
        }
    })
}

exports.editCompany = async(req, res) => {//Función que edita la compañia
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
    await companyModel.updateCompanyById(id, companyActualizado, function(err,datosActualizados){//Llama al método del modelo para actualizar la compañia por id
        if(err){//Si hay error
            console.log("error")//Muestra el error en consola
            res.render("error.ejs", {err})//Renderiza página de error
        }else{//Si no hay error
            console.log(datosActualizados)//Muestra los datos por consola
            res.redirect(`/api/${process.env.API}/company/SSR${datosActualizados._id}`)//Redirecciona al listado con los datos actualizados
        }
    })        
}

exports.deleteCompany = async(req, res)=>{//Función que elimina la compañía
    const {id} = req.params
    await companyModel.deleteCompanyById(id,function(err,datosEliminados){
        if(err){//Si hay error
            console.log("cagadom")//Muestra el error en consola
            res.render("error.ejs", {err})//Renderiza página de error
        }else{//Si no hay error
            res.redirect(`/api/${process.env.API}/company`)//Redirecciona al listado
        }
    })    
}

//CSR

//Todas las empresas en json
exports.findAllCompaniesJSON = async(req, res) => {//Función que muestra todas las compañias
    await companyModel.findAll({}, function(err, datosCompany){
        if(err){//Si hay error
            console.log(err)//Muestra el error en consola
            res.status(404).json(err)//pasa un json del error con el codigo 404
        }else{//Si no hay error
            res.status(200).json({empresas:datosCompany})//pasa un json con la información de todas las empresas
        }
    })
}

//Una empresa por id en json
exports.findAllCompaniesByIdJSON = async(req, res) => {//Función que muestra las compañias por id
    const {id} = req.params

    await companyModel.findCompanyById(id, function(err, datosCompany){
        if(err){//Si hay error
            console.log(err)//Muestra el error en consola
            res.status(404).json(err)//pasa un json del error con el codigo 404
        }else{//Si no hay error
            res.status(200).json(datosCompany)//pasa un json con la información de la empresa
        }
    })
}

//Crear una empresa
exports.createCompanyJSON = async(req, res) => {//Función que crea la nueva compañía
    await companyModel.createCompany(req.body, function(err, companyCreated){
        if(err){//Si hay error
            console.log(err)//Muestra el error en consola
            res.status(400).json(err)//pasa un json con el error con el codigo 400
        }else{//Si no hay error
            console.log(companyCreated)//Muestra los datos de la nueva compañía
            res.status(200).json(companyCreated)//pasa un json con los datos de la empresa creada
        }
    })
}

//Editar empresa
exports.editCompanyJSON = async(req, res) => {//Función que edita la compañia
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
    await companyModel.updateCompanyById(id, companyActualizado, function(err,datosActualizados){//Llama al método del modelo para actualizar la compañia por id
        if(err){//Si hay error
            console.log("error")//Muestra el error en consola
            res.status(400).json(err)//pasa un json con el error con el codigo 400
        }else{//Si no hay error
            console.log(datosActualizados)//Muestra los datos por consola
            res.status(200).json(datosActualizados)//pasa un json con los datos actualizados
        }
    })        
}

//Eliminar empresa
exports.deleteCompanyJSON = async(req, res)=>{//Función que elimina la compañía
    const {id} = req.params
    await companyModel.deleteCompanyById(id,function(err,datosEliminados){
        if(err){//Si hay error
            console.log("error")//Muestra el error en consola
            res.status(400).json(err)//pasa un json con el error con el codigo 400
        }else{//Si no hay error
            res.status(200).json(datosEliminados)//pasa un json con los datos eliminados
        }
    })    
}