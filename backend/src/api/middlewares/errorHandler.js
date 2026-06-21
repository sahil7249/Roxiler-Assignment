import { ApiError } from "../../utils/ApiError.js"

export const errorHandler =  (err,req,res,next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if(err['code'] == "P2002") {
        err = new ApiError(err.statusCode,`${err.meta.target} must be unique key`,err.status)
    }
    const response = {
        status : err.status,
        message : err.message
    }
    
    res.status(err.statusCode).json(response)
}