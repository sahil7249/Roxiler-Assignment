import prisma from "../config/prisma.config.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getOwnerDashboard = asyncHandler(async(req,res) => {
    const id = req?.user.id

    const stores = await prisma.store.findMany({
        where : { ownerId : Number(id)}
    })

    if(!stores) {
        throw new ApiError(404,"No store found for this owner")
    }

    const ratings = await prisma.rating.findMany({
        where : { storeId : stores.id },
        include : {
            user : {
                select : {
                    id : true,
                    email : true,
                    address : true
                }
            }
        }
    })

    const totalRatings = ratings.length
    const avgRatings =  totalRatings > 0 
        ? ratings.reduce((sum,r) => sum + r.value ,0) / totalRatings
        : 0

    const data = {
        store : {
            ...stores,
            averageRating : parseFloat(avgRatings.toFixed(1)),
            totalRatings
        },
        ratings
    }

    return res.json(
        new ApiResponse(200,"Owner dashboard fetched successfully",data)
    )
})