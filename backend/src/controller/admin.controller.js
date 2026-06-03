import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import prisma from "../config/prisma.config.js";

export const createStore = asyncHandler(async (req,res) => {
    const { name,email,address,ownerId } = req?.body;

    const store = await prisma.store.create({
        data : {
            name,
            email,
            address,
            ownerId:Number(ownerId)
        }
    })

    return res.json(
        new ApiResponse(200,"Store created successfully",store)
    )
})


export const getStores = asyncHandler(async(req,res) => {
    const { name,address,email } = req?.query

    let where = {}

    if(name) {
        where.name = {
            contains: name
        }
    }

    if(address) {
        where.address = {
            contains : address
        }
    }

    if(email) {
        where.email = {
            contains : email
        }
    }

    const stores = await prisma.store.findMany({
        where ,
        include : {
            ratings : {
                select : { value : true}
            }
        }
    })

    const storeWithRatings = stores.map((store) => {
        const totalRatings = store.ratings.length
        const avgRatings = 
        totalRatings > 0 
            ? store.ratings.reduce((sum,r) => sum + r.value,0 ) / totalRatings
            : 0
        
        return {
            ...store,
            averageRating : parseFloat(avgRatings.toFixed(1)),
            totalRatings
        }
    })

    return res.json(
        new ApiResponse(200,"Stores fetched successfully",storeWithRatings)
    )
})

export const getStats = asyncHandler(async(req,res) => {
    const totalUsers = await prisma.user.count()
    const totalStores = await prisma.store.count()
    const totalRatings = await prisma.rating.count()

    return res.json(
        new ApiResponse(200,"Stats fetched successfully",{
            totalUsers,
            totalStores,
            totalRatings
        })
    )
})