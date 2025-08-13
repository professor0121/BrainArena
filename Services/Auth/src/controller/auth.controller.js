// import User from "../dao/user.dao.js";
import User from '../model/user.model.js'
import { hashPassword, comparePassword } from "../utils/password.util.js";
import { generateToken } from "../utils/jwt.util.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashed = await hashPassword(password);
    const newUser = await User.create({ name, email, password: hashed, role });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
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