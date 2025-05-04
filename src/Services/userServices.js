import User from "../models/User.js"
import uploadImage from "../utils/cloudinary.js";

const createUser = async (data) => {
    console.log(data);
    return await User.create(data);
}

const getAllUsers = async () => {
    return await User.find();
}
const getUserById = async (id) => {
    return await User.findById(id);
}

const uploadProfileImage = async (userId, file) => {
    const uploadedFile = await uploadImage(file);
    return await User.findByIdAndUpdate(userId, { profileImageUrl: uploadedFile.url }, { new: true });

}
export default { createUser, getAllUsers, getUserById, uploadProfileImage }