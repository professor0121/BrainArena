import { createAdmin,getAdminByEmail } from "../dao/admin.dao.js";
import { hashPassword ,comparePassword} from "../utils/password.util.js";
import { generateToken } from "../utils/jwt.util.js";

export const createAdminService = async ({ name, email, password }) => {
  // 1. Check if user already exists
  const existingUser = await getAdminByEmail(email);
  if (existingUser) {
    throw new Error("Email is already registered");
  }

  // 2. Hash password
  const hashedPassword = await hashPassword(password);
  // 3. Save user via DAO
  const newUser = await createAdmin({
    name,
    email,
    password: hashedPassword,
  });

  // 4. Hide password in returned object
  const userObj = newUser.toObject();
  delete userObj.password;

  return userObj;
};

export const loginAdminService = async (email, password) => {
  const user = await getAdminByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken({ id: user._id });
  delete user.password;
  return { token, user };
};


export const getAdminService=async(email)=>{
    return await getAdminByEmail(email);
}