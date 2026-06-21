import { create, getAllStores, getStoresByAddress, getStoresByEmail, getStoresByName } from '../repository/store.repository.js'
import { findUserById } from '../repository/user.repository.js'
import { ApiError } from '../utils/ApiError.js'

export const createStore = async (storeData) => {
    const existingStore = await getStoresByEmail(storeData.email)[0]

    if(existingStore) {
        throw new ApiError(509,"Store exists with given email id.")
    }

    const user = await findUserById(storeData.ownerId)
    if(!user) {
        throw new ApiError(404,"Store owner does not exists with given id")
    } 

    if(user.role !== "STORE_OWNER") {
        throw new ApiError(404,`The user with id ${user.id} is not a store owner`)
    }

    const store = await create(storeData)
    return store
}

export const getStores = async(storeParams) => {
    let stores;

    const isParamsUndefined = Object.values(storeParams).every(value => value === undefined)

    if(isParamsUndefined) {
        stores = await getAllStores()
    }

    if(storeParams.name){
        stores = await getStoresByName(storeParams.name)
    }

    if(storeParams.email) {
        stores = await getStoresByEmail(storeParams.email)
    }

    if(storeParams.address) {
        stores = await getStoresByAddress(storeParams.address)
    }

    const storesWithRating = stores.map((store) => {
        const totalRatings = store.ratings?.length;
        const avgRating = 
            totalRatings > 0 
            ? store.ratings.reduce((sum,r) => sum + r.value,0) / totalRatings
            : 0
        
        return {
            ...store,
            totalRatings,
            avgRating : parseFloat(avgRating.toFixed(1))
        }
    })
    return storesWithRating
}