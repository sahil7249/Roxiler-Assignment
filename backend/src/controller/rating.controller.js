import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import prisma from "../config/prisma.config.js";

export const rateStore = asyncHandler(async(req,res) => {
    const { value,storeId } = req?.body

    const store = await prisma.store.findUnique({
        where : { id : Number(storeId)}
    })

    if(!store) {
        throw new ApiError(404,"Store not found")
    }

    const existingRating = await prisma.rating.findUnique({
        where : {
            userId_storeId: {
                userId : req.user.id,
                storeId : store.id
            }
        }
    })
    let rating;
    if(existingRating) {
        rating = await prisma.rating.update({
            where : { id : existingRating.id },
            data : { value }
        })
    } else {
        rating = await prisma.rating.create({
            data : { 
                value,
                userId : req.user.id,
                storeId : Number(storeId) 
            }
        })
    }
    return res.json( 
        new ApiResponse(200,"Store rated successfully",rating)
    )
})