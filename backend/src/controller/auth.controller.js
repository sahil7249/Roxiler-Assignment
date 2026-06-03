import asynHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import prisma from "../config/prisma.config.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const login = asynHandler(async (req,res) => {
    const { email, password } = req?.body;

    const user = await prisma.user.findUnique({
        where : {
            email
        }
    })

    if(!user) {
        throw new ApiError(404,"Invalid user does not exists")
    }
    
    if(!bcrypt.compare(password,user.password)) {
        throw new ApiError(500,"Invalid password")
    }

    const token = jwt.sign({
        id:user.id,
        role:user.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn:'7d'
    })

    delete user.password

    const data = {
        user : user,
        token : token
    }

    return res.json(
        new ApiResponse(200,"User logged in successfully",data)
    )
})





export const register = asynHandler(async (req,res) => {
    const { name,email,address,password,role } = req?.body

    const isUserAlreadyExists = await prisma.user.findUnique({ where : { email }});
    
    if(isUserAlreadyExists) {
        throw new ApiError(409,"User already exists with given mail id")
    }

    const hashedPassword = bcrypt.hashSync(
        password,
        Number(process.env.SALT_ROUND)
    )

    const user = await prisma.user.create({
        data : {
            name,
            email,
            address,
            password : hashedPassword,
            role
        },
        omit : { password : true }
    })

    return res.json(
        new ApiResponse(200,"User registered successfully",user)
    )
})