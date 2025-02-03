require("dotenv").config()//Importa y configura las variables de entorno
const bcrypt = require("../utils/bcrypt")
const userModel = require("../models/users.model")//Importa el modelo de users

const { wrapAsync } = require("../utils/functions")
const AppError = require("../utils/AppError")
const jwtMW = require("../middleware/jwt.mw")

exports.findAllUsers = wrapAsync(async function(req,res,next) {//Función para mostrar todos los usuarios
    await userModel.findAll(function(err,datosUsers){//Llama al método del modelo para encontrar todos los usuarios
        if(err){//Si hay error
            next(new AppError(err, 400))//Renderiza página de error
        }else{//Si no hay error
            res.render(`users/index.ejs`, {datosUsers})//Renderiza la página que muestra todos los usuarios
        }
    })    
})

exports.findUserById = wrapAsync(async function(req,res){//Función para mostrar los usuarios por id
    const {id} = req.params
    await userModel.findById(id,function(err,datosUsuario){//Llama al método del modelo para encontrar los usuarios por id
        if(err){//Si hay error
            next(new AppError(err, 400))//Renderiza página de error
        }else{//Si no hay error
            res.render(`users/show.ejs`,{datosUsuario:datosUsuario[0]})//Renderiza la página de usuario por id
        }
    })
})


exports.newUser = function (req,res) {//Función que redirige al formulario
    res.render("users/new.ejs")//Renderiza el formulario de nuevo usuario
}

exports.createUser = wrapAsync(async function(req,res){//Función para crear el nuevo usuario
    // Crear nuevo objeto usuario con los datos del formulario
    const newUser = new userModel({
        nif: req.body.nif,
        username: req.body.username,
        password: bcrypt.hashPassword(req.body.password),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        picture: req.body.picture || null,
        profile: req.body.profile,
        createdDate: new Date(),
        modifiedDate: new Date()
    })

    await userModel.create(newUser, function(err, datosUsuarioCreado){//Llama al método del modelo para crear los usuarios
        if(err){//Si hay error
            next(new AppError(err, 400))//Renderiza página de error
        } else {//Si no hay error
            res.redirect(`/api/${process.env.API}/users/SSR`)//Redirecciona al listado
        }
    })
})

exports.modifyUser = wrapAsync(async function(req,res){//Función para modificar el usuario
    const {id} = req.params
    await userModel.findById(id,function(err,datosUsuario){//Llama al método del modelo para encontrar los usuarios por id
        if(err){//Si hay error
            next(new AppError(err, 400))//Renderiza página de error
        }else{//Si no hay error
            res.render(`users/edit.ejs`,{datosUsuario:datosUsuario[0]})
        }
    })
})

exports.updateUser = wrapAsync(async function(req,res){//Función para actualizar el usuario
    const {id} = req.params
    const updateUser = {
        nif: req.body.nif,
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        profile: req.body.profile,
        modifiedDate: new Date()
    }
    
    await userModel.update(id,updateUser,function(err,datosUsuarioActualizado){//Llama al método del modelo para actualizar el usuario
        if(err){//Si hay error
            next(new AppError(err, 400))//Renderiza página de error
        }else{//Si no hay error
            res.redirect(`/api/${process.env.API}/users/SSR`)//Redirecciona al listado
        }
    })
})


exports.deleteUserById = wrapAsync(async function(req,res){//Función para eliminar al usuario
    const {id} = req.params
    await userModel.deleteById(id,function(err,datosUsuario){
        if(err){//Si hay error
            next(new AppError(err, 400))//Renderiza página de error
        }else{//Si no hay error
            res.redirect(`/api/${process.env.API}/users/SSR`)//Redirecciona al listado
        }
    })
})

exports.findAllUsersJSON = wrapAsync(async function(req,res) {//Función para mostrar todos los usuarios
    await userModel.findAll(function(err,datosUsers){//Llama al método del modelo para encontrar todos los usuarios
        if(err){//Si hay error
            next(new AppError(err, 400))
        }else{//Si no hay error
            res.status(200).json(datosUsers)
        }
    })    
})

exports.findUserByIdJSON = wrapAsync(async function(req,res){//Función para mostrar los usuarios por id
    const {id} = req.params
    await userModel.findById(id,function(err,datosUsuario){//Llama al método del modelo para encontrar los usuarios por id
        if(err){//Si hay error
            next(new AppError(err, 400))
        }else{//Si no hay error
            res.status(200).json(datosUsuario)
        }
    })
})

exports.createUserJSON = wrapAsync(async function(req,res){//Función para crear el nuevo usuario
    // Crear nuevo objeto usuario con los datos del formulario
    const newUser = new userModel({
        nif: req.body.nif,
        username: req.body.username,
        password: bcrypt.hashPassword(req.body.password),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        picture: req.body.picture || null,
        profile: req.body.profile,
        createdDate: new Date(),
        modifiedDate: new Date()
    })

    await userModel.create(newUser, function(err, datosUsuarioCreado){//Llama al método del modelo para crear los usuarios
        if(err){//Si hay error
            console.error("Error al crear usuario:", err);//Muestra el error en consola
            next(new AppError(err, 400))
        } else {//Si no hay error
            res.status(200).json(datosUsuarioCreado)
        }
    })
})

exports.updateUserJSON = wrapAsync(async function(req,res){//Función para actualizar el usuario
    const {id} = req.params
    const updateUser = {
        nif: req.body.nif,
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        profile: req.body.profile,
        modifiedDate: new Date()
    }
    
    await userModel.update(id,updateUser,function(err,datosUsuarioActualizado){//Llama al método del modelo para actualizar el usuario
        if(err){//Si hay error
            next(new AppError(err, 400))
        }else{//Si no hay error
            res.status(200).json(datosUsuarioActualizado)
        }
    })
})


exports.deleteUserByIdJSON = wrapAsync(async function(req,res){//Función para eliminar al usuario
    const {id} = req.params
    await userModel.deleteById(id,function(err,datosUsuario){
        if(err){//Si hay error
            next(new AppError(err, 400))
        }else{//Si no hay error
            res.status(200).json(datosUsuario)
        }
    })
})

exports.login = wrapAsync(async function(req, res){
    const {id} = req.params
    await userModel.findById(id, function(err, datosUsuario){
        if(err){
            next(new AppError(err, 401))
        }else{
            res.status(200).json(datosUsuario)
        }
    })
})

exports.showLogin = (req, res) => {
    res.render("users/login.ejs")
}

exports.showRegister = (req, res) => {
    res.render("users/new.ejs")
}

exports.showDataUser = (req, res) => {
    if (!req.session.userLogued) {
        return res.status(401).json({ msg: "No autorizado" })
    }
    res.render("userData.ejs", {
        username: req.session.userLogued.data.username,
        profile: req.session.userLogued.data.profile
    })
}

exports.logout = (req, res) => {
    req.session.destroy()
    res.status(200).json({ msg: "Sesión cerrada correctamente" })
}