const mongoose = require("mongoose")

const inscriptionSchema = new mongoose.Schema({
    IdUser: {
        type: Number, //tipo Number
        required: true,//es requerido
    },
    IdCompany: {
        type: String, //tipo String
        required: true,//es requerido
    },
    FecIni: {
        type: Date, // Fecha obligatoria de inicio
        required: true,//es requerido
    },
    FecFin: {
        type: Date, // Fecha opcional de fin
        required: false,//no es requerido
    },
    Observaciones: {
        type: String, // Campo de texto libre
        required: false,//no es requerido
    },
})

//1:N


// Crear el modelo a partir del esquema
const Inscription = mongoose.model("Inscription", inscriptionSchema)

Inscription.createInscription = async(inscriptionData, result) => {
    const newInscription = new Inscription(inscriptionData)
    await newInscription.save()
    .then((datos) => {
        result(null, datos)
    })
    .catch((err) => {
        result(err, null)
    })
}

Inscription.findAllInscription = async(filter={}, result)=>{
    const datos = await Inscription.find(filter)
    if(datos && datos.length > 0){
        result(null, datos)
    }else{
        result({"error":"No hay datos"}, null)
    }
}

Inscription.updateInscriptionById = async(id, inscriptionData, result) => {
    await Inscription.findByIdAndUpdate(id, inscriptionData, {runValidators:true, new:true})
    .then((datosResult) => {
        result(null, datosResult)
    })
    .catch((err) => {
        result(err, null)
    })
}

Inscription.deleteInscriptionById = async(id, result) => {
    await Inscription.findByIdAndDelete(id)
    .then((datos) => {
        result(null, datos)
    })
    .catch((err) => {
        result(err, null)
    })
}


module.exports = Inscription
