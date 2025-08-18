import Admin from '../model/admin.model.js';


export const createAdmin = async (userData) => {
    const user = new Admin(userData);
    return await user.save();
};

export const getAdminByEmail = async (email) => {
    return await Admin.findOne({email});
}