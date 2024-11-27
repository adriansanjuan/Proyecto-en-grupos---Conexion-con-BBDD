const mongoose = require("mongoose")

const companySchema = new mongoose.Schema({
    //_id --> NO es String, sino ObjectID
    cif:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    personInCharge:{
        type:String,
        required:true
    },
    personInChargeID:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:false
    },
    family:{
        type:String,
        required:false
    },
    address:{
        type:String,
        required:false
    },
    area:{
        type:String,
        required:false
    },
    postalCode:{
        type:Number,
        required:false
    },
    phone:{
        type:Number,
        required:false
    },
    email:{
        type:String,
        required:false
    },
    createdDate:{
        type:Date,
        required:false
    },
    modifiedDate:{
        type:Date,
        required:false
    }
})

//Crear modelo a partir del esquema MONGOOSE
const company = mongoose.model("company", companySchema)

company.createCompany = async(companyData, result) => {
    const newCompany = new company(companyData)
    await newCompany.save()
    .then((datos) => {
        result(null, datos)
    })
    .catch((err) => {
        result(err, null)
    })
}

company.findAll = async(filter={}, result)=>{
    const datos = await comment.find(filter)
    if(datos && datos.length > 0){
        result(null, datos)
    }else{
        result({"error":"No hay datos"}, null)
    }
}

company.findCommentById = async(id, result)

module.exports = comment