export const errorHandler = (err,req,res,next) => {
    let { statusCode,message } = err
    
    res.status(statusCode || 500).json({
        success: false,
        message : statusCode ? message : "Internal server error"
    })
}