require("dotenv").config()
const userModel = require("../models/users.model")

exports.findAllUsers = async function(req,res) {
    await userModel.findAll(function(err,datosUsers){
        if(err){
            res.render("error.ejs",{err})
        }else{
            res.render(`/users/index.ejs`, {datosUsers})
        }
    })    
}

exports.findUserById = async function(req,res){
    const {id} = req.params
    await userModel.findById(id,function(err,datosUsuario){
        if(err){
            res.render("error.ejs", {err})
        }else{
            res.render(`/users/show.ejs`,{datosUsuario})
        }
    })
}

exports.createUser = async function(req,res){
    //const {newEmployee} = req.body
    const newUser = new userModel(req.body)
    await userModel.create(newUser,function(err,datosUsuarioCreado){
        if(err){
            res.render("error.ejs", {err})
        }else{
            res.redirect(`/api/${process.env.API}/users/`)
        }
    })
}

exports.updateUser = async function(req,res){
    //const {newEmployee} = req.body
    const {id} = req.params
    const updateUser = new userModel(req.body)
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