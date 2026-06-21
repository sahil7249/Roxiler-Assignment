import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { createStore as create,getStores as getStore } from "../../service/store.service.js";

export const createStore = asyncHandler( async (req, res) => {
  const storeData = req?.body;
  const store = await create(storeData);

  return res.json(new ApiResponse(201, "Store created Successfully", true,store));
});


export const getStores = asyncHandler(async(req,res) =>{
  const {id,name,email,address,ownerId } = req?.query
  const storeParams = {
    id,
    name,
    email,
    address,
    ownerId
  }

  const stores = await getStore(storeParams)
  return res.json(new ApiResponse(200,"Store data fetched successfully",true,stores))
})