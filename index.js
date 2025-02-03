require("dotenv").config() // Cargamos variables de entorno desde el archivo .env (npm i dotenv)
const methodOverride = require("method-override") // Method-override nos permite usar métodos como PUT y DELETE en formularios (npm i method-override)
const express = require("express") // Express para crear el servidor (npm i express)
const fs = require("fs")
const https = require("https")
const app = express() // Aquí tenemos la instancia del servidor
const path = require("path") // Tenemos el Path para manejar rutas de archivos (npm i path)
const port = process.env.PORT || process.env.PUERTO // Configuración del puerto usando variables de entorno
// Importación de rutas específicas:
const companyRoutes = require("./routes/company.routes")
const usersRoutes = require("./routes/users.routes")
const inscriptionRoutes = require("./routes/inscription.routes")
const mongodbConfig = require("./utils/mongodb.config")
const swaggerUI = require('swagger-ui-express')
const specs = require('./swagger/swagger')
const logger = require("./utils/logger")
const errorHandlerMW = require("./middleware/errorHandler.mw")
const AppError = require("./utils/AppError")
const morganMW = require("./middleware/morgan.mw")
const cors = require("cors")

//Carga de certificados para HTTPS
let certificado = null
let key_certificate = null
let https_server = false
try {
    certificado = fs.readFileSync("tls/jtp.crt")
    key_certificate = fs.readFileSync("tls/jtp.key")
    https_server = true
} catch (error) {
    console.log(error)
}

// ********** CONFIGURACIONES DEL SERVIDOR **********

app.use(methodOverride("_method")) // Configuramos methodOverride para permitir métodos HTTP como PUT y DELETE en formularios HTML
app.set("views",path.join(__dirname,"views")) // Definimos la carpeta de vistas
app.set("view engine","ejs")  // Usamos EJS como motor de plantillas
app.use(express.static(path.join(__dirname,"public"))) // Configuramos Express para servir archivos estáticos (como imágenes, JS) desde la carpeta "public"
app.use(express.urlencoded({extended:true})) // Lo usamos para datos de formularios (POST)
app.use(express.json()) // Lo usamos para datos en formato JSON (POST)

app.use((req,res,next) => { // Middleware para definir variables globales accesibles en las vistas de EJS
    //Variables Globales
    res.locals.BaseURL = `/api/${process.env.API}/`
    next()
})

/* CORS */
const blackList = [] 

const corsOptions = {
    origin:(origin, callback) => {
        console.log(origin)
        if(blackList.includes(origin) || !origin){
            callback(new AppError("No estás autorizado", 403), false)
        }else{
            callback(null, true)
        }
    },
    credentials: true
}

app.use(cors(corsOptions))

app.use(morganMW.usingMorgan())

// ********** RUTAS DEL SERVIDOR **********

app.use(`/api-docs`,swaggerUI.serve,swaggerUI.setup(specs)) //Configura las rutas para swagger
app.use(`/api/${process.env.API}/company`,companyRoutes) // Configura las rutas para company usando la versión especificada en el .env
app.use(`/api/${process.env.API}/users`,usersRoutes) // Configura las rutas para users usando la versión especificada en el .env
app.use(`/api/${process.env.API}/inscription`,inscriptionRoutes) // Configura las rutas para inscription usando la versión especificada en el .env


// app.get("*",(req,res)=>{
//     res.status(500).json({err:"No existe la ruta"})
// })

//Middleware propio para las rutas no existentes
app.use((req,res)=>{
    logger.error.fatal("Ruta no existente " + req.originalUrl)
    throw new AppError("Ruta no existente", 404) //NOT FOUND
})

//Gestión de todos los errores (Síncronos y Asíncronos del API)
app.use(errorHandlerMW.errorHandler)


// ********** INICIAR SERVIDOR **********

if (https_server) { //se han cargado bien los certificados para https
    https.createServer({
        cert:certificado,
        key:key_certificate
    },app).listen(port, async () => {
        console.log(`${process.env.MENSAJE} https://localhost:${port}/api-docs`)
        console.log(`${process.env.MENSAJE} https://localhost:${port}/api/${process.env.API}/users/login`)
        logger.access.info(`${process.env.MENSAJE} https://localhost:${port}/api/${process.env.API}/users/login`)
        try {
            //Una vez levantado el servidor, intentamos conectar con MongoDB
            await mongodbConfig.conectarMongoDB()
            .then(()=>{
                console.log("Conectado con MongoDB!!!")
            })
            .catch((err)=>{
                //Si no conectamos con MongoDB, debemos tumbar el server
                console.log(`Error al conectar. Desc: ${err}`)
                process.exit(0)
            })
        } catch (error) {
            //Si no conectamos con MongoDB, debemos tumbar el server
            console.log(`Error en el server. Desc: ${error}`)
            process.exit(0)
        }
    })
}else{
    app.listen(port, async()=>{
        console.log(`${process.env.MENSAJE} http://localhost:${port}/api-docs`)
        console.log(`${process.env.MENSAJE} http://localhost:${port}/api/${process.env.API}/users/login`)
        logger.access.info(`${process.env.MENSAJE} http://localhost:${port}/api/${process.env.API}/users/login`)
        try {
            //Una vez levantado el servidor, intentamos conectar con MongoDB
            await mongodbConfig.conectarMongoDB()
            .then(()=>{
                console.log("Conectado con MongoDB!!!")
            })
            .catch((err)=>{
                //Si no conectamos con MongoDB, debemos tumbar el server
                console.log(`Error al conectar. Desc: ${err}`)
                process.exit(0)
            })
        } catch (error) {
            //Si no conectamos con MongoDB, debemos tumbar el server
            console.log(`Error en el server. Desc: ${error}`)
            process.exit(0)
        }
    })
}