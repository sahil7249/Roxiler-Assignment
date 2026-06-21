import joi from 'joi'

export const createStoreSchema = joi.object({
    body : joi.object({
        name : joi.string().required().min(20).max(60),
        email: joi.string().required().email(),
        address: joi.string().required().max(400),
        ownerId: joi.number().required()
    })
})