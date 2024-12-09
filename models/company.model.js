const mongoose = require("mongoose")//Se indica que se require el uso del paquete mongoose

const companySchema = new mongoose.Schema({//Se crea el schema del que van a partir todas las empresas
    //_id --> NO es String, sino ObjectID
    cif:{//numero de identificación de la empresa (como el DNI)
        type:String,//tipo string
        required:true,//es requerido
        unique:true//es único
    },
    name:{//nombre de la empresa
        type:String,//tipo String
        required:true//es requerido
    },
    city:{//La ciudad en la que se encuentra la empresa
        type:String,//tipo String
        required:true//es requerido
    },
    personInCharge:{//persona a cargo de la empresa
        type:String,//tipo String
        required:true//es requerido
    },
    personInChargeID:{//ID de la persona a cargo de la empresa
        type:String,//tipo String
        required:true//es requerido
    },
    type:{//tipo de la empresa
        type:String,//tipo String
        required:false//no es requerido
    },
    address:{//dirección de la empresa
        type:String,//tipo string
        required:false//no es requerido
    },
    area:{//provincia
        type:String,//tipo string
        required:false//no es requerido
    },
    postalCode:{//código postal
        type:Number,//tipo número
        required:false//no es requerido
    },
    phone:{//número de teléfono
        type:Number,//tipo número
        required:false//no es requerido
    },
    email:{//email de la empresa
        type:String,//tipo String
        required:false//no es requerido
    },
    createdDate:{//fecha en la que se creó la empresa
        type:Date,//tipo fecha
        required:false//no es requerido
    },
    modifiedDate:{//última fecha de modificación
        type:Date,//tipo fecha
        required:false//no es requerido
    }
})

//Crear modelo a partir del esquema MONGOOSE
const company = mongoose.model("company", companySchema)
//función para crear una nueva empresa
company.createCompany = async(companyData, result) => {
    const newCompany = new company(companyData)//crea una nueva empresa a partir de los datos pasados a la función
    await newCompany.save()//ejecuta el comando save para guardar los datos de la empresa en la BBDD
    .then((datos) => {//si hay datos
        result(null, datos)//devuelve un resultado sin error y con los datos
    })
    .catch((err) => {//si no hay datos
        result(err, null)//devuelve un resultado con el error y sin datos
    })
}
//función para encontrar todas las empresas
company.findAll = async(filter={}, result)=>{//el filtro está vacío
    const datos = await company.find(filter)//los datos se igualan a el comando find aplicando el filtro vacío, por lo que cogerá todas las empresas
    if(datos && datos.length > 0){//si hay datos y la longitud de los datos es mayor a 0
        result(null, datos)//devuelve un resultado sin errores y con los datos
    }else{//si no
        result({"error":"No hay datos en el find all"}, null)//devuelve un resultado donde el error es que no hay datos
    }
}
//función para encontrar empresas por su ID
company.findCompanyById = async(id, result) => {//aceptamos como parámetro el ID
    const datos = await company.findById(id)//igualamos los datos a el comando findById pasándole como parámetro el id de la empresa que estamos buscando
    if(datos){//si hay datos
        result(null, datos)//devuelve un resulado sin errores y con los datos de la empresa buscada
    }else{//si no
        result({"error":"No hay datos"}, null)//devuelve un resultado con un error que indica que no hay datos
    }
}
//función para actualizar empresas por su ID
company.updateCompanyById = async(id, companyData, result) => {//aceptamos como parámetros el id de la empresa y los datos que se van a actualizar
    await company.findByIdAndUpdate(id, companyData, {runValidators:true, new:true})//se busca la empresa por su id y se actualizan sus datos mediante el comando findByIdAndUpdate
    .then((datosResult) => {//si hay datos
        console.log("todo ha ido bien")
        result(null, datosResult)//devuelve un resultado sin errores y con los datos de la empresa actualizados
    })
    .catch((err) => {//si no
        console.log("cagadon")
        result(err, null)//devuelve un resultado con el error
    })
}
//función para eliminar las empresas por su ID
company.deleteCompanyById = async(id, result) => {//aceptamos como parámetro el ID de la empresa
    await company.findByIdAndDelete(id)//se elimina la empresa por su ID utilizando el comando findByIdAndDelete
    .then((datos) => {//si hay datos
        result(null, datos)//devuelve un resultado sin errores y con los datos
    })
    .catch((err) => {//si no
        result(err, null)//devuelve un resultado con el error
    })
}

//exportamos para poderlo usar en el controller
module.exports = company