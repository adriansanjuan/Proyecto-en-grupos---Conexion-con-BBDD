const mongoose = require("mongoose")

const mongoose = require("mongoose")
const { type } = require("os")

const inscription = new mongoose.Schema({
    IdUser:{
        type:Number,
        require:true
    },
    IdCompany:{
        type:Number,
        require:true
    },
    FecIni:{
        type:Date,
        require:true
    },
    FecFin:{
        type:Date,
        require:false
    },
    Observaciones:{
        type:String,
        require:false
    }
})

module.exports = inscription

module.exports = comment