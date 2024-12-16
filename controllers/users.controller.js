require("dotenv").config()//Importa y configura las variables de entorno
const userModel = require("../models/users.model")//Importa el modelo de users

exports.findAllUsers = async function(req,res) {//Función para mostrar todos los usuarios
    await userModel.findAll(function(err,datosUsers){//Llama al método del modelo para encontrar todos los usuarios
        if(err){//Si hay error
            res.render("error.ejs",{err})//Renderiza página de error
        }else{//Si no hay error
            res.render(`users/index.ejs`, {datosUsers})//Renderiza la página que muestra todos los usuarios
        }
    })    
}

exports.findUserById = async function(req,res){//Función para mostrar los usuarios por id
    const {id} = req.params
    await userModel.findById(id,function(err,datosUsuario){//Llama al método del modelo para encontrar los usuarios por id
        if(err){//Si hay error
            res.render("error.ejs", {err})//Renderiza página de error
        }else{//Si no hay error
            res.render(`users/show.ejs`,{datosUsuario:datosUsuario[0]})//Renderiza la página de usuario por id
        }
    })
}


exports.newUser = async function (req,res) {//Función que redirige al formulario
    res.render("users/new.ejs")//Renderiza el formulario de nuevo usuario
}

exports.createUser = async function(req,res){//Función para crear el nuevo usuario
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

    await userModel.create(newUser, function(err, datosUsuarioCreado){//Llama al método del modelo para crear los usuarios
        if(err){//Si hay error
            console.error("Error al crear usuario:", err);//Muestra el error en consola
            res.render("error.ejs", {err})//Renderiza página de error
        } else {//Si no hay error
            res.redirect(`/api/${process.env.API}/users/`)//Redirecciona al listado
        }
    })
}

exports.modifyUser = async function(req,res){//Función para modificar el usuario
    const {id} = req.params
    await userModel.findById(id,function(err,datosUsuario){//Llama al método del modelo para encontrar los usuarios por id
        if(err){//Si hay error
            res.render("error.ejs", {err})//Renderiza página de error
        }else{//Si no hay error
            res.render(`users/edit.ejs`,{datosUsuario:datosUsuario[0]})
        }
    })
}

exports.updateUser = async function(req,res){//Función para actualizar el usuario
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
            res.render("error.ejs", {err})//Renderiza página de error
        }else{//Si no hay error
            res.redirect(`/api/${process.env.API}/users/`)//Redirecciona al listado
        }
    })
}


exports.deleteUserById = async function(req,res){//Función para eliminar al usuario
    const {id} = req.params
    await userModel.deleteById(id,function(err,datosUsuario){
        if(err){//Si hay error
            res.render("error.ejs", {err})//Renderiza página de error
        }else{//Si no hay error
            res.redirect(`/api/${process.env.API}/users/`)//Redirecciona al listado
        }
    })
}

exports.findAllUsersJSON = async function(req,res) {//Función para mostrar todos los usuarios
    await userModel.findAll(function(err,datosUsers){//Llama al método del modelo para encontrar todos los usuarios
        if(err){//Si hay error
            res.status(404).json(err)
        }else{//Si no hay error
            res.status(200).json(datosUsers)
        }
    })    
}

exports.findUserByIdJSON = async function(req,res){//Función para mostrar los usuarios por id
    const {id} = req.params
    await userModel.findById(id,function(err,datosUsuario){//Llama al método del modelo para encontrar los usuarios por id
        if(err){//Si hay error
            res.status(404).json(err)
        }else{//Si no hay error
            res.status(200).json(datosUsuario)
        }
    })
}

exports.createUserJSON = async function(req,res){//Función para crear el nuevo usuario
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

    await userModel.create(newUser, function(err, datosUsuarioCreado){//Llama al método del modelo para crear los usuarios
        if(err){//Si hay error
            console.error("Error al crear usuario:", err);//Muestra el error en consola
            res.status(400).json(err)
        } else {//Si no hay error
            res.status(200).json(datosUsuarioCreado)
        }
    })
}

exports.updateUserJSON = async function(req,res){//Función para actualizar el usuario
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
            res.status(400).json(err)
        }else{//Si no hay error
            res.status(200).json(datosUsuarioActualizado)
        }
    })
}


exports.deleteUserByIdJSON = async function(req,res){//Función para eliminar al usuario
    const {id} = req.params
    await userModel.deleteById(id,function(err,datosUsuario){
        if(err){//Si hay error
            res.status(400).json(err)
        }else{//Si no hay error
            res.status(200).json(datosUsuario)
        }
    })
}
