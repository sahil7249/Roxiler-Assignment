import prisma from '../config/prisma.config.js'

export const create = async (userData) => {
  const user = await prisma.user.create({
    data: userData,
  });
  return user; 
};

export const findUserById = async (id) => {
  const user = await prisma.user.findUnique({ where: { id } });
  return user;
};

export const findUsersByName = async (name) => {
  const users = await prisma.user.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });

  return users;
};

export const findUserByEmail = async (email) => {
  const users = await prisma.user.findUnique({
    where: {
      email: email
    },
  });

  return users;
};

export const findUserByAddress = async (address) => {
  const users = await prisma.user.findMany({
    where: {
      address: {
        contains: address,
      },
    },
  });

  return users;
};

export const findUsersByEmail = async(email) => {
  const users = await prisma.user.findMany({
    where : {
      email : {
        contains : {
          email
        }
      }
    }
  })
  return users;
}

export const findUserByRole = async (role) => {
  const users = await prisma.user.findMany({
    where: {
      role: role,
    },
  });

  return users;
};

export const updatePassword = async (id,newPassword) => {
  
  const updatedUser = await prisma.user.update({
    where : { id : id },
    data : {
      password : newPassword
    }
  })

  return updatedUser
}
