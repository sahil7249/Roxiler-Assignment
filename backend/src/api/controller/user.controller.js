import  { asyncHandler }  from "../../utils/asyncHandler.js"
import { ApiResponse } from "../../utils/ApiResponse.js";
import { createUser,getUsersByParams,loginWithEmailAndPassword, updateUserPassword } from "../../service/user.service.js";

export const register = asyncHandler (async (req,res) => {
    const { name,email,address,password,role } = req?.body;

    const user = await createUser({ name,email,address,password,role})

    return res.json(
        new ApiResponse(201,"User registered successfully",true,user)
    )
})


export const login = asyncHandler(async(req,res) => {
    const { email,password } = req?.body

    const data = await loginWithEmailAndPassword({email,password})

    return res.json(
        new ApiResponse(200,"User logged in successfully",true,data)
    )
})

export const updatePassword = asyncHandler(async(req,res) => {
    const { id } = req?.params

    const userData = req?.body

    const updatedUser = await updateUserPassword(Number(id),userData);

    return res.json(
        new ApiResponse(200,"Password updated successfully",true,updatedUser)
    )

})

export const getUsers = asyncHandler(async(req,res) => {
    const { name,email,address,role } = req?.query
    const userParams = {
        name,
        email,
        address,
        role
    }

    const users = await getUsersByParams(userParams)
    return res.json(
        new ApiResponse(200,"Users fetched successfully",true,users)
    )
})
