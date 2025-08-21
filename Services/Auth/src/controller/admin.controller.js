import {createAdminService,loginAdminService,getAdminService} from '../services/admin.service.js'

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Call service with await
    const admin = await createAdminService({ name, email, password });

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      admin,
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
    const { token, admin } = await loginAdminService(email, password);

    res.json({ token, admin });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const me= async(req,res)=>{
    const adminId = req.admin.id;
    const admin=await getAdminService(adminId);
    if(!admin) return res.status(400).json({message:"not found"})
    return res.status(200).json({admin:admin})
}