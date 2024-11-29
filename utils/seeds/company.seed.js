const companyModel = require("../../models/company.model")
const mongodbConfig = require("../mongodb.config")

const ejecutar = async()=>{
    await mongodbConfig.conectarMongoDB()
    .then(()=>{
        console.log("Conectado con MongoDB!!!")
    })
    .catch((err)=>{
        //Si no conectamos con MongoDB, debemos tumbar el server
        console.log(`Error al conectar. Desc: ${err}`)
        process.exit(0)
    })

    const company =[
        {
            cif:"",
            name:"",
            city:"",
            personInCharge:"Manolito Caramierda Sanchez",
            personInChargeID:"99999998Y",
            tyoe:"",
            family:"",
            empresa:"",
            address:"",
            area:"",
            postalCode:33000,
            phone:666504030,
            email:"",
            createDate:1-10-2024,
            modifiedDate: new Date()
        },
        {
            cif:"",
            name:"",
            city:"",
            personInCharge:"Teodosio Ramirez ",
            personInChargeID:"99999997M",
            tyoe:"",
            family:"",
            empresa:"",
            address:"",
            area:"",
            postalCode:33000,
            phone:666504031,
            email:"",
            createDate:10-10-2024,
            modifiedDate: new Date()
        },
        {
            cif:"",
            name:"",
            city:"",
            personInCharge:"",
            personInChargeID:"99999996F",
            tyoe:"",
            family:"",
            empresa:"",
            address:"",
            area:"",
            postalCode:33000,
            phone:666504032,
            email:"",
            createDate:3-10-2024,
            modifiedDate: new Date()
        }
    ]

    await companyModel.insertMany(company)
    .then((res)=>{
        console.log(res)
    })
    .catch((err)=>{
        console.log(err)
    })
    
    process.exit()
}

ejecutar()