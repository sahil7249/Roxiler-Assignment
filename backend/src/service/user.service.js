import { create, findUserByAddress, findUserByEmail, findUserById, findUserByRole, findUsersByName, updatePassword } from "../repository/user.repository.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const sanitizeUser = (user) => {
  const { password, ...sanitized } = user.toObject ? user.toObject() : user;
  return sanitized;
};

export const createUser = async (userData) => {
  const existingUser = await findUserByEmail(userData.email);

  if (existingUser) {
    throw new ApiError(509, "Email already registered");
  }

  const hashedPassword = await bcrypt.hash(
    userData.password,
    Number(process.env.SALT_ROUNDS),
  );

  const user = await create({
    ...userData,
    password: hashedPassword,
  });

  return sanitizeUser(user);
};

export const loginWithEmailAndPassword = async (userData) => {
  const user = await findUserByEmail(userData.email);

  if(!user) {
    throw new ApiError(404,"User not exists with given email id")
  }

  if (!await bcrypt.compare(userData.password, user.password)) {
    throw new ApiError(401, "Invalid password");
  }

  const token = await jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  const data = {
    user: sanitizeUser(user),
    token,
  };

  return data;
};

export const updateUserPassword = async (id,userData) => {
    const user = await findUserById(id);

    if(!await bcrypt.compare(userData.oldPassword,user.password)){
        throw new ApiError(401,"Invalid password")
    }

    const hashedPassword = await bcrypt.hash(userData.newPassword,Number(process.env.SALT_ROUNDS))

    const updatedUser = await updatePassword(id,hashedPassword);

    return sanitizeUser(updatedUser)
}

export const getUsersByParams = async (userParams) => {
  let users = [];
  
  if(userParams.name) {
    users = await findUsersByName(userParams.name)
  }
 
  if(userParams.email) {
    users = await findUserByEmail(userParams.email)
  }

  if(userParams.address) {
    users = await findUserByAddress(userParams.address)
  }

  if(userParams.role){
    users = await findUserByRole(userParams.role)
  }

  users = users.map((user) => {
    return sanitizeUser(user)
  })

  return users
}
