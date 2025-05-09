import User from "../models/User.js"
import bcrypt from "bcrypt";

const login = async (data) => {
  const user = await User.findOne({
    // $or:[{ email: data.email },{number:data.number}]
    email:data.email
  }); 
 
  if(!user) {
    throw{
      statusCode:401,
      message:"Email and password do not matched."
    }
  }
  const isPasswordMatched = bcrypt.compareSync(data.password, user.password);
  if (!isPasswordMatched) {
    throw {
      statusCode: 401,
      message: "Email and Password do not matched.",
    }
  }
 

  return user;

}

const register = async (data) => {
  const user = await User.findOne({email:data.email});
  if (user){
    throw {
      statusCode: 409,
      message: "User already exists"
    }
  }

  const hashedPassword = bcrypt.hashSync(data.password, 10);
  return await User.create({ 
    name:data.name,
    email:data.email,
    number:data.number,
    password: hashedPassword ,
    confirmPassword:hashedPassword
  });
}


export default { login, register };