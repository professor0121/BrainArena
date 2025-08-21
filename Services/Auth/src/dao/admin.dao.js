import e from 'express';
import Admin from '../model/admin.model.js';


export const createAdmin = async (adminData) => {
    const admin = new Admin(adminData);
    return await admin.save();
};

export const getAdminByEmail = async (email) => {
    return await Admin.findOne({email});
}

export const getAdminById = async (id) => {
    return await Admin.findById(id);
};