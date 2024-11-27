const dbConn = require("../utils/mysql.config")
const mysql = require("mysql")

let user = function(empleado){
    //id autoincremental
    this.nif = empleado.nif
    this.username = empleado.username
    this.password = empleado.password
    this.firstName = empleado.firstName
    this.lastName = empleado.lastName
    this.createdDate = new Date()
    this.modifiedDate = new Date()
    this.email = empleado.email
    this.picture = empleado.picture
    this.profile = empleado.profile
}

module.exports = comment