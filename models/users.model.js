const dbConn = require("../utils/mysql.config") // Importa configuración de MySQL
const mysql = require("mysql") // Importa MySQL (npm i mysql)

let user = function (empleado) { // Constructor de usuario
    //id autoincremental
    this.nif = empleado.nif // NIF
    this.username = empleado.username, // Usuario
        this.password = empleado.password, // Contraseña
        this.firstName = empleado.firstName, // Nombre
        this.lastName = empleado.lastName, // Apellido
        this.createdDate = empleado.createdDate || new Date(), // Fecha creación
        this.modifiedDate = new Date(), // Fecha modificación
        this.email = empleado.email, // Email
        this.picture = empleado.picture || null, // Foto 
        this.profile = empleado.profile // Rol
}

user.findAll = async (result) => { // Función para obtener todos los usuarios
    let connection = mysql.createConnection(dbConn) // Crea conexión MySQL

    connection.connect((error) => { // Abre la conexion
        if (error) { // Si hay error
            console.log("Error conectando a MySQL. Desc: " + error)//Hace un console log de error
        } else { //Si no hay error
            console.log("Conexion MySQL abierta")//Hace un cosole log para confirmar la conexion de MySQL
            const sql = "select * from users" // Query para seleccionar usuarios
            connection.query(sql, function (err, datos) { // Ejecuta la query
                if (err) { // Si hay error
                    result(err, null) //Envia el error sin los datos
                } else { //Si no hay error
                    result(null, datos) //Envia los datos sin el error
                }
            })

            connection.end((err) => { // Cierra la conexión
                if (err) { // Si hay un error
                    console.log("Error al desconectar de MySQL. Desc: " + err) //Hace un console log de error
                    return
                } else { //Si no hay un error
                    console.log("Conexión MySQL cerrada") //Hace un console log de que se ha cerrado la conexion
                }
            })
        }
    })
}

//Encontrar por id
user.findById = async (id, result) => { // Método para buscar usuario por ID
    let connection = mysql.createConnection(dbConn) // Crea conexión MySQL

    connection.connect((error) => { // Conecta a la BD
        if (error) {// Si hay un error
            console.log("Error conectando a MySQL. Desc: " + error) //Hace un console log de error
        } else {//Si no hay un error
            console.log("Conexión MySQL abierta")//Hace un cosole log para confirmar la conexion de MySQL
            const sql = "select * from users where idUser = ?" // Query para buscar por ID
            connection.query(sql, id, function (err, datos) { // Ejecuta la query
                if (err) { // Si hay error
                    result(err, null) //Envia el error sin los datos
                } else { //Si no hay error
                    result(null, datos) //Envia los datos sin el error
                }
            })
            connection.end((err) => { // Cierra la conexión
                if (err) { // Si hay un error
                    console.log("Error al desconectar de MySQL. Desc: " + err) //Hace un console log de error
                    return
                } else { //Si no hay un error
                    console.log("Conexión MySQL cerrada") //Hace un console log de que se ha cerrado la conexion
                }
            })
        }
    })
}

user.create = async (newUser, result) => { // Método para crear usuario
    let connection = mysql.createConnection(dbConn) // Crea conexión MySQL

    connection.connect((error) => { // Conecta a la BD
        if (error) { // Si hay error
            console.log("Error conectando a MySQL. Desc: " + error)//Hace un console log de error
        } else { //Si no hay error
            console.log("Conexión MySQL abierta")//Hace un cosole log para confirmar la conexion de MySQL
            const sql = "insert into users SET ?" // Query para insertar usuario

            connection.query(sql, newUser, function (err, datos) { // Ejecuta la query
                if (err) { // Si hay error
                    result(err, null) //Envia el error sin los datos
                } else { //Si no hay error
                    result(null, datos)//Envia los datos sin el error
                }
            })

            connection.end((err) => { // Cierra la conexión
                if (err) { // Si hay un error
                    console.log("Error al desconectar de MySQL. Desc: " + err) //Hace un console log de error
                    return
                } else { //Si no hay un error
                    console.log("Conexión MySQL cerrada") //Hace un console log de que se ha cerrado la conexion
                }
            })
        }
    })
}

user.update = async (id, updateUser, result) => { // Método para actualizar usuario
    let connection = mysql.createConnection(dbConn) // Crea conexión MySQL

    connection.connect((error) => { // Conecta a la BD
        if (error) { // Si hay error
            console.log("Error conectando a MySQL. Desc: " + error)//Hace un console log de error
        } else { //Si no hay error
            console.log("Conexión MySQL abierta")//Hace un cosole log para confirmar la conexion de MySQL
            const sql = "update users SET ? where idUser = ?" // Query para actualizar usuario

            connection.query(sql, [updateUser, id], function (err, datos) { // Ejecuta la query
                if (err) {  // Si hay error
                    result(err, null) //Envia el error sin los datos
                } else { //Si no hay error
                    result(null, datos)//Envia los datos sin el error
                }
            })

            connection.end((err) => { // Cierra la conexión
                if (err) { // Si hay error
                    console.log("Error al desconectar de MySQL. Desc: " + err)//Hace un console log de error
                    return
                } else { //Si no hay error
                    console.log("Conexión MySQL cerrada") //Hace un console log de que se ha cerrado la conexion
                }
            })
        }
    })
}

user.deleteById = async (id, result) => { // Método para eliminar usuario
    let connection = mysql.createConnection(dbConn) // Crea conexión MySQL

    connection.connect((error) => { // Conecta a la BD
        if (error) { // Si hay error
            console.log("Error conectando a MySQL. Desc: " + error)//Hace un console log de error
        } else { //Si no hay error
            console.log("Conexión MySQL abierta")//Hace un cosole log para confirmar la conexion de MySQL
            const sql = "delete from users where idUser = ?" // Query para eliminar usuario            

            connection.query(sql, id, function (err, datos) { // Ejecuta la query
                if (err) { // Si hay error
                    result(err, null) //Envia el error sin los datos
                } else { //Si no hay error
                    result(null, datos)//Envia los datos sin el error
                }
            })

            connection.end((err) => { // Cierra la conexión
                if (err) { // Si hay error
                    console.log("Error al desconectar de MySQL. Desc: " + err)//Hace un console log de error
                    return
                } else { //Si no hay error
                    console.log("Conexión MySQL cerrada") //Hace un console log de que se ha cerrado la conexion
                }
            })
        }
    })
}

module.exports = user // Exporta el modelo