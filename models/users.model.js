const { connection } = require("mongoose")
const dbConn = require("../utils/mysql.config")
const mysql = require("mysql")

let user = function(empleado){
    //id autoincremental
    this.nif = empleado.nif
    this.username = empleado.username,
    this.password = empleado.password,
    this.firstName = empleado.firstName,
    this.lastName = empleado.lastName,
    this.createdDate = new Date(),
    this.modifiedDate = new Date(),
    this.email = empleado.email,
    this.picture = empleado.picture,
    this.profile = empleado.profile
}


//Encontrar todos
user.findAll = async (result) => {
    let connection = mysql.createConnection(dbConn)

    connection.connect((error)=>{
        if (error) {
            console.log("Error conectando a MySQL. Desc: " + error)
        } else {
            console.log("Conexion MySQL abierta")
            const sql = "select * from users"
            connection.query(sql,function(err,datos){
                if (err) {
                    result(err,null)
                }else{
                    result(null,datos)
                }
            })

            connection.end((err)=>{
                if (err) {
                    console.log("Error al desconectar de MySQL. Desc: " + err)
                    return
                } else {
                    console.log("Conexión MySQL cerrada")
                }
            })
        }
    })
}

//Encontrar por id
user.findById = async (id,result) => {
    let connection = mysql.createConnection(dbConn)

    connection.connect((error)=>{
        if (error) {
            console.log("Error conectando a MySQL. Desc: " + error)
        } else {
            console.log("Conexión MySQL abierta")
            const sql = "select * from users where idUser = ?"
            connection.query(sql,id,function(err,datos){
                if (err) {
                    result(err,null)
                } else {
                    result(null,datos)
                }
            })
            connection.end((err)=>{
                if (err) {
                    console.log("Error al desconectar de MySQL. Desc: " + err)
                    return   
                } else {
                    console.log("Conexión MySQL cerrada")
                }
            })
        }
    })
}

user.create = async (newUser, result) => {
    let connection = mysql.createConnection(dbConn)

    connection.connect((error)=>{
        if (error) {
            console.log("Error conectando a MySQL. Desc: " + error)
        } else {
            console.log("Conexión MySQL abierta")
            const sql = "insert into users SET ?"
    
            connection.query(sql,newUser,function (err,datos) {
                if (err) {
                    result(err,null)
                } else {
                    result(null,datos)
                }
            })

            connection.end((err)=>{
                if (err) {
                    console.log("Error al desconectar de MySQL. Desc: " + err)
                    return
                } else {
                    console.log("Conexión MySQL cerrada")
                }
            })
        }
    })
}

user.update = async (id,updateUser,result) => {
    let connection = mysql.createConnection(dbConn)

    connection.connect((error)=>{
        if (error) {
            console.log("Error conectando a MySQL. Desc: " + error)
        } else {
            console.log("Conexión MySQL abierta")
            const sql = "update users SET ? where idUser = ?"
    
            connection.query(sql,[updateUser,id],function (err,datos) {
                if (err) {
                    result(err,null)
                } else {
                    result(null,datos)
                }
            })

            connection.end((err)=>{
                if (err) {
                    console.log("Error al desconectar de MySQL. Desc: " + err)
                    return
                } else {
                    console.log("Conexión MySQL cerrada")
                }
            })
        }
    })
}

user.deleteById = async (id,result) => {
    let connection = mysql.createConnection(dbConn)

    connection.connect((error) => {
        if(error){
            console.log("Error conectando a MySQL. Desc: " + error)
        } else {
            console.log("Conexión MySQL abierta")
            const sql = "delete from users where id = ?"            
            
            connection.query(sql,id,function(err,datos){
                if(err){
                    result(err,null)
                }else{
                    result(null,datos)
                }
            })
    
            connection.end((err)=>{
                if(err){
                    console.log("Error al desconectar de MySQL. Desc: " + err)
                    return
                }else{
                    console.log("Conexión MySQL cerrada")
                }
            })
        }
    })
}

module.exports = user