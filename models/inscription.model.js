const mongoose = require("mongoose")

const inscriptionSchema = new mongoose.Schema({
    IdInscription: {
        _id: Number
    },
    IdUser: {
        type: Number, // Clave primaria del usuario
        required: true,
    },
    IdCompany: {
        type: String, 
        required: true,
    },
    FecIni: {
        type: Date, // Fecha obligatoria de inicio
        required: true,
    },
    FecFin: {
        type: Date, // Fecha opcional de fin
        required: false,
    },
    Observaciones: {
        type: String, // Campo de texto libre
        required: false,
    },
})

//1:N


// Crear el modelo a partir del esquema
const Inscription = mongoose.model("Inscription", inscriptionSchema)

module.exports = Inscription
