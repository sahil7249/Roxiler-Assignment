import { ApiError } from "../../utils/ApiError.js"
import jwt from 'jsonwebtoken'

export const authenticate = (req,res,next) => {
    const authHeader = req?.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new ApiError(401,"Unauthorized"))
    }

    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        next(new ApiError(401,"Invalid token"))
    }
}

export const authorize = (...roles) => {
    return (req,res,next) => {
        if(!req.user) {
            throw new ApiError(401,"Unauthorized")
        }
        if(!roles.includes(req.user.role)) {
            throw new ApiError(403,"Permission prohibited")
        }
        next()
    }
}