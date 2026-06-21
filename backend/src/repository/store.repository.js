import prisma from "../config/prisma.config.js";

export const create = async (storeData) => {
  const store = await prisma.store.create({
    data: {
      name: storeData.name,
      email: storeData.email,
      address: storeData.address,
      ownerId: storeData.ownerId,
    },
  });

  return store;
};

export const findtoreById = async (storeId) => {
  const store = await prisma.store.findUnique({ where: { id: storeId } });
  return store;
};

export const getStoresByName = async (storeName) => {
  const stores = await prisma.store.findMany({
    where: {
      name: {
        contains: storeName,
      },
    },
    include: {
      ratings: {
        select: { value: true },
      },
    },
  });

  return stores;
};

export const getStoresByEmail = async (storeEmail) => {
  const stores = await prisma.store.findMany({
    where: {
      email: {
        contains: storeEmail,
      },
    },
  });

  return stores;
};

export const getStoresByAddress = async (storeAddr) => {
  const stores = await prisma.store.findMany({
    where: {
      address: {
        contains: storeAddr,
      },
    },
  });
  return stores;
};

export const getAllStores = async() => {
  const stores = await prisma.store.findMany()
  return stores
}
