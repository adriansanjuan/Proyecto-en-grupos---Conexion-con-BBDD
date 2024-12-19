require("dotenv").config()
const { version } = require("mongoose")
const swaggerJsdoc = require("swagger-jsdoc")

const options = {
    definition:{
        openapi:'3.0.0',
        info:{
            title:"API JTP",
            version: process.env.API_VERSION,
            contact:{
                name: "JTP"
            },
            servers:[
                {
                    url:"http://localhost:" + process.env.PUERTO,
                    description: "Local Server"
                }
            ]
        }
    },
    apis:['./routes/*js']
}

const specs = swaggerJsdoc(options)
module.exports = specs