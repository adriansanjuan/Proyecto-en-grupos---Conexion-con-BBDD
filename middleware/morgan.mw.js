const morgan = require('morgan')
const fs = require('fs')
require('dotenv').config()
const ruta = process.env.LOGS_FOLDER

exports.usingMorgan = () => {
    return morgan('short',{
        stream: app.get('env') == 'development'? fs.createWriteStream(ruta+"access.log",{flags:'a'}):''
    })
}