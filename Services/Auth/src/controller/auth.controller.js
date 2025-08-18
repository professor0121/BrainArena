// import User from "../dao/user.dao.js";
import User from '../model/user.model.js'
import { hashPassword, comparePassword } from "../utils/password.util.js";
import { generateToken } from "../utils/jwt.util.js";
import { createUser } from '../services/auth.service.js';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Call service with await
    const user = await createUser({ name, email, password });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken({ id: user.id, role: user.role });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const me= async(req,res)=>{
    const {email}=req.body;
    const user=await User.findOne({where:{email}})
    if(!user) return res.status(400).json({message:"not found"})
    return res.status(200).json({user:user})
}

export const update=async(req,res)=>{
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const [updated] = await User.update(
            { name, email },
            { where: { id } }
        );

        if (updated) {
            res.send("User updated successfully");
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating user");
    }
}

export const deleteUser=async(req,res)=>{
     try {
        const { id } = req.params;
        const deleted = await User.destroy({ where: { id } });

        if (deleted) {
            res.send("User deleted successfully");
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting user");
    }
}