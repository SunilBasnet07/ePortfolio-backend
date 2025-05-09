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

const uploadProfileImage = async (req, res) => {
    const file = req.file;
    const user = req.user;
    const data = req.body;

    try {
        // if (user.email !== data.email) {
        //     return res.status(400).json({ message: "Email cannot be updated" });
        // }
      
        const updatedUser = await userServices.uploadProfileImage(user, file, data);
        const formattedData = formatterUserData(updatedUser);
        
        return res.status(200).json(formattedData);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ 
            message: error.message || "Internal server error" 
        });
    }
}

export { createUsers,getAllUsers ,getUserById,uploadProfileImage}