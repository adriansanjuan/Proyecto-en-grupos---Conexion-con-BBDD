exports.rutasPro = (req,res,next) =>{
    const {pass} = req.query
    if(pass & pass == "daw"){
        next()
    }else{
        res.status(401).json({'err':'Acceso denegado'})
    }
}