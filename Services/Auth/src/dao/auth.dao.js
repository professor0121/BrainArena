import User from '../model/user.model.js';
/**
 * Create a new user
 */
export const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

/**
 * Find all users
 */
export const getAllUsers = async () => {
  return await User.find();
};

/**
 * Find user by ID
 */
export const getUserById = async (id) => {
  return await User.findById(id);
};

/**
 * Find user by email
 */
export const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

/**
 * Update user by ID
 */
export const updateUserById = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, {
    new: true, // return updated document
    runValidators: true, // apply schema validation
  });
};

/**
 * Delete user by ID
 */
export const deleteUserById = async (id) => {
  return await User.findByIdAndDelete(id);
};

/**
 * Check if email exists (for signup validation)
 */
export const isEmailTaken = async (email) => {
  const user = await User.findOne({ email });
  return !!user;
};
