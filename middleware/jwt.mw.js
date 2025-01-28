require("dotenv").config()
const jwt = require("jsonwebtoken") //npm i jsonwebtoken
const AppError = require("../utils/AppError")

function extractToken(req){
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === "Bearer"){
        return req.headers.authorization.split(' ')[1]
    }else if (req.query && req.query.token){
        return req.query.token
    }else if (req.session && req.session.userLogued && req.session.userLogued.token){
        return req.session.userLogued.token
    }else{
        return null
    }
}

exports.authenticate = (req,res,next) => {
    const token = extractToken(req)
    if(token){
        jwt.verify(token, process.env.SECRET_JWT, (err,decoded)=>{
            if(err){
                next(new AppError("Token inválida",401))
            }else{
                console.log(decoded)
                next()
            }
        })
    }else{
        next(new AppError("Debes iniciar sesión", 401))
    }
}

exports.createJWT = (req,res,next,userData) => {
    try {
        const payload = { userData }
        const token = jwt.sign(payload, process.env.SECRET_JWT, {
            expiresIn: '30m'
        })
        console.log(token)
        if(token){
            return token
        }else{
            return null
        }
    } catch (error) {
        next(new AppError(error.message,500))
    }
}

exports.destroyJWT = (req) => {
    const result = jwt.sign(req.session.userLogued.token,"", {expiresIn:1},(logout,err) => {
        return true
    })   
}