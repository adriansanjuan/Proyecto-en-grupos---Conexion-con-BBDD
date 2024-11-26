const mongoose = require("mongoose")

const mongoose = require("mongoose")
const { type } = require("os")

const inscription = new mongoose.Schema({
    IdUser:{
        type:Number,
    },
    IdCompany:{
        type:Number,
    },
    FecIni:{
        type:Date,
        require:true
    },
    FecFin:{
        type:Date,
    },
    Observaciones:{
        type:text
    }
})

module.exports = inscription

module.exports = comment