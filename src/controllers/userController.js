import formatterUserData from "../helpers/formatter.js";
import userServices from "../Services/userServices.js";

const createUsers = async (req, res) => {
    const data = req.body;
    try {
        const user = await userServices.createUser(data);
        const formatterData = formatterUserData(user);

        res.json(formatterData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
const getAllUsers = async (req, res) => {
   try {
        const users = await userServices.getAllUsers();
   
        res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
const getUserById = async (req, res) => {
    const id = req.params.id;
    try {
         const user = await userServices.getUserById(id);
         const formatterData = formatterUserData(user);

        res.json(formatterData);
     } catch (error) {
         res.status(500).send(error.message);
     }
 };

const uploadProfileImage = async(req,res)=>{
    const file = req.file;
    const userId = req.user.id;
try {
    const updatedUser= await userServices.uploadProfileImage(userId,file);
    const formatterData= formatterUserData(updatedUser);
     res.json(formatterData);
} catch (error) {
    res.status(error.statusCode || 500).send(error.message)
}
}

export { createUsers,getAllUsers ,getUserById,uploadProfileImage}