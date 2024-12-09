require("dotenv").config()
const userModel = require("../models/users.model")

exports.findAllUsers = async function(req,res) {
    await userModel.findAll(function(err,datosUsers){
        if(err){
            res.render("error.ejs",{err})
        }else{
            res.render(`users/index.ejs`, {datosUsers})
        }
    })    
}

exports.findUserById = async function(req,res){
    const {id} = req.params
    await userModel.findById(id,function(err,datosUsuario){
        if(err){
            res.render("error.ejs", {err})
        }else{
            res.render(`users/show.ejs`,{datosUsuario:datosUsuario[0]})
        }
    })
}


exports.newUser = async function (req,res) {
    res.render("users/new.ejs")
}

exports.createUser = async function(req,res){
    // Crear nuevo objeto usuario con los datos del formulario
    const newUser = new userModel({
        nif: req.body.nif,
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        picture: req.body.picture || null,
        profile: req.body.profile,
        createdDate: new Date(),
        modifiedDate: new Date()
    })

    await userModel.create(newUser, function(err, datosUsuarioCreado){
        if(err){
            console.error("Error al crear usuario:", err);
            res.render("error.ejs", {err})
        } else {
            res.redirect(`/api/${process.env.API}/users/`)
        }
    })
}

exports.modifyUser = async function(req,res){
    const {id} = req.params
    await userModel.findById(id,function(err,datosUsuario){
        if(err){
            res.render("error.ejs", {err})
        }else{
            res.render(`users/edit.ejs`,{datosUsuario:datosUsuario[0]})
        }
    })
}

exports.updateUser = async function(req,res){
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
    
    await userModel.update(id,updateUser,function(err,datosUsuarioActualizado){
        if(err){
            res.render("error.ejs", {err})
        }else{
            res.redirect(`/api/${process.env.API}/users/`)
        }
    })
}


exports.deleteUserById = async function(req,res){
    const {id} = req.params
    await userModel.deleteById(id,function(err,datosUsuario){
        if(err){
            res.render("error.ejs", {err})
        }else{
            res.redirect(`/api/${process.env.API}/users/`)
        }
    })
}
