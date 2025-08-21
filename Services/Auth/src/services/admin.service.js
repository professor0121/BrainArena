import { createAdmin,getAdminByEmail,getAdminById } from "../dao/admin.dao.js";
import { hashPassword ,comparePassword} from "../utils/password.util.js";
import { generateToken } from "../utils/jwt.util.js";

export const createAdminService = async ({ name, email, password }) => {
  // 1. Check if admin already exists
  const existingAdmin = await getAdminByEmail(email);
  if (existingAdmin) {
    throw new Error("Email is already registered");
  }

  // 2. Hash password
  const hashedPassword = await hashPassword(password);
  // 3. Save admin via DAO
  const newAdmin = await createAdmin({
    name,
    email,
    password: hashedPassword,
  });

  // 4. Hide password in returned object
  const adminObj = newAdmin.toObject();
  delete adminObj.password;

  return adminObj;
};

export const loginAdminService = async (email, password) => {
  const admin = await getAdminByEmail(email);
  if (!admin) throw new Error("Invalid credentials");

  const isMatch = await comparePassword(password, admin.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken({ id: admin._id });
  delete admin.password;
  return { token, admin };
};


export const getAdminService=async(adminId)=>{
    return await getAdminById(adminId);
}