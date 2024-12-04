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
            cif:"A12345677",
            name:"Sierras Manolo",
            city:"Valencia",
            personInCharge:"Manolito Sanchez",
            personInChargeID:"99999998Y",
            type:"FERRETERIA",
            address:"Calle Mayor, 8",
            area:"Valencia",
            postalCode:46001,
            phone:666504030,
            email:"manolosierras@sierras.com",
            createDate:1-10-2024,
            modifiedDate: new Date()
        },
        {
            cif:"A12345678",
            name:"Aeronix",
            city:"Alicante",
            personInCharge:"Teodosio Ramirez ",
            personInChargeID:"99999997M",
            tyoe:"INDUSTRIA",
            address:"Gran Via, 300",
            area:"Alicante",
            postalCode:33000,
            phone:666504031,
            email:"aeronix2@aero.com",
            createDate:10-10-2024,
            modifiedDate: new Date()
        },
        {
            cif:"A12345679",
            name:"PasstaTime",
            city:"Madrid",
            personInCharge:"Antonio Virgolini",
            personInChargeID:"99999996F",
            tyoe:"OSTELERIA",
            address:"Gran Via, 33",
            area:"Madrid",
            postalCode:33000,
            phone:666504032,
            email:"passtasmadrid@passta.com",
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