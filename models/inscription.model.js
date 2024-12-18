const mongoose = require("mongoose")// Importa mongoose para MongoDB

const inscriptionSchema = new mongoose.Schema({// Define el esquema de inscripción
    IdUser: {
        type: Number,// Define tipo número
        required: true,// Campo obligatorio
    },
    IdCompany: {
        type: String,// Define tipo texto
        ref: 'company',
        required: true,
    },
    FecIni: {
        type: String,// Define tipo fecha
        required: true,// Campo obligatorio
    },
    FecFin: {
        type: String,// Define tipo fecha
        required: false,// Campo opcional
    },
    Observaciones: {
        type: String,// Define tipo texto
        required: false,// Campo opcional
    },
})


// Crear el modelo a partir del esquema
const Inscription = mongoose.model("Inscription", inscriptionSchema)// Crea modelo Inscription

Inscription.createInscription = async(inscriptionData, result) => {// Método para crear inscripción
    const newInscription = new Inscription(inscriptionData)// Crea nueva instancia
    await newInscription.save()// Guarda en base de datos
    .then((datos) => {
        result(null, datos)// Retorna datos si hay éxito
    })
    .catch((err) => {
        result(err, null)// Retorna error si hay algún fallo
    })
}

Inscription.findAllInscription = async(result)=>{// Método para buscar todas las inscripciones
    const datos = await Inscription.find({})// Busca todas las inscripciones
    if(datos){ //Si hay datos
        result(null, datos) // Retorna todos los datos encontrados
    }else{ //Si no hay datos
        result({"error":"No hay datos"},null)// Retorna un  error si no encuentra
    }
}

Inscription.findInscriptionById = async(id, result)=>{// Método para buscar por ID
    const datos = await Inscription.findById(id)// Busca por la ID
    if(datos){ //Si hay datos
        result(null,datos)// Retorna los datos si los encuentra
    }else{ //Si no hay datos
        result({"error":"No hay datos"},null)// Retorna un  error si no encuentra
    }
}

Inscription.updateInscriptionById = async(id, inscriptionData, result) => { // Método actualizar por ID
    await Inscription.findByIdAndUpdate(id, inscriptionData, {runValidators:true, new:true}) // Actualiza documento
    .then((datosResultado) => {
        result(null, datosResultado)// Retorna los datos actualizados
    })
    .catch((err) => {
        result(err, null)// Retorna error si hay algún fallo
    })
}

Inscription.deleteInscriptionById = async(id, result) => {// Método para eliminar por ID
    await Inscription.findByIdAndDelete(id)
    .then((datos) => {
        result(null, datos)// Retorna los datos eliminados
    })
    .catch((err) => {
        result(err, null)// Retorna un error si hay algún fallo
    })
}


module.exports = Inscription// Exportamos el modelo
