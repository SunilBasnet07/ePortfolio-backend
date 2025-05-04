import Project from "../models/Project.js"
import uploadImage from "../utils/cloudinary.js";

const createProject=async(data,userId,file)=>{
    const uploadedFile= await uploadImage(file);
    return await Project.create({...data,createdBy:userId,imageUrl:uploadedFile.url});

}
const updateProject=async(id,data,file)=>{
    const uploadedFile = await uploadImage(file);
    return await Project.findByIdAndUpdate(id,{...data,imageUrl:uploadedFile.url},{new:true});

}
const deleteProject=async(id)=>{
    return await Project.findByIdAndDelete(id);

}
const getProjectById=async(id)=>{
    return await Project.findById(id);

}
const getProjectByUser=async(userId)=>{
    return await Project.find({createdBy:userId});

}


export default {createProject,updateProject,deleteProject,getProjectById,getProjectByUser}