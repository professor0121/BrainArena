import { createUser as createUserDAO, getUserByEmail,updateUserById } from "../dao/auth.dao.js";
import { hashPassword,comparePassword } from "../utils/password.util.js";
import { generateToken } from "../utils/jwt.util.js";
/**
 * Service to handle user registration
 */
export const createUser = async ({ name, email, password }) => {
  // 1. Check if user already exists
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error("Email is already registered");
  }

  // 2. Hash password
  const hashedPassword = await hashPassword(password);
  // 3. Save user via DAO
  const newUser = await createUserDAO({
    name,
    email,
    password: hashedPassword,
  });

  // 4. Hide password in returned object
  const userObj = newUser.toObject();
  delete userObj.password;

  return userObj;
};


export const loginUserService = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken({ id: user._id });
  delete user.password;
  return { token, user };
};

export const meService=async(email)=>{
  return await getUserByEmail(email);
}



export const updateUserService = async (id, userData) => {
  try {
    const updatedUser = await updateUserById(id, userData);
    if (!updatedUser) {
      return null; // user not found
    }
    return updatedUser;
  } catch (error) {
    throw error;
  }
};


/**
 * Delete user service
 */
export const deleteUserService = async (id) => {
  const deletedUser = await deleteUserById(id);
  return deletedUser;
};