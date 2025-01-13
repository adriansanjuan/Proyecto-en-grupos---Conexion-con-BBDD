exports.errorHandler = (err,req,res,next) => {
    const { status=500, message='ERROR GENERAL' } = err
    console.log('errorHandler')
    res.status(status).json(message)
}