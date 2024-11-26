require("dotenv").config()
const methodOverride = require("method-override")
const express = require("express")
const app = express()
const path = require("path")
const port = process.env.PORT || process.env.PUERTO
const companyRoutes = require("./routes/company.routes")
const usersRoutes = require("./routes/users.routes")
const inscriptionRoutes = require("./routes/inscription.routes")

app.use(methodOverride("_method"))
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use((req,res,next) => {
    //Variables Globales
})

// app.use(`/api/${process.env.API_VERSION}/company`)
// app.use(`/api/${process.env.API_VERSION}/users`)
// app.use(`/api/${process.env.API_VERSION}/inscription`)


app.get("*",(req,res)=>{
    res.status(500).json({err:"No existe la ruta"})
})

app.listen(port, async()=>{
    console.log(`${process.env.MENSAJE} http://localhost:${port}/api/${process.env.API_VERSION}/company`)
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