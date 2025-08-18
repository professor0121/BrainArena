import { createUser,loginUserService,meService,updateUserService ,deleteUserService} from '../services/auth.service.js';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email,password)
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
    console.log(email,password)
    const { token, user } = await loginUserService(email, password);

    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const me= async(req,res)=>{
    const {email}=req.body;
    const user=await meService(email);
    if(!user) return res.status(400).json({message:"not found"})
    return res.status(200).json(user)
}

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const updatedUser = await updateUserService(id, { name, email });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in updateUser controller:", error);
    res.status(500).json({ message: "Error updating user" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserService(id);

    if (!deletedUser) {
      return res.status(404).send("User not found");
    }

    res.send("User deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting user");
  }
};