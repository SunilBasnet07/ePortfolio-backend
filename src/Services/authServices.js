import ResetPassword from "../models/ResetPassword.js";
import User from "../models/User.js"
import bcrypt from "bcrypt";
import resendEmail from "../utils/resend.js";

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

const forgotPassword = async(email)=>{
  const userId = await User.findOne({email:email})
  const otp = Math.floor(Math.random()*1000000)
  const resetPassword = await ResetPassword.create({
    userId:userId?._id,
    token:otp,
  })
  await resendEmail(email,{
    subject:"Reset password link ",
    body:`${process.env.RESET_PASSWORD_URL}/autn/reset-password/${resetPassword?.userId}?token=${resetPassword?.token}`
  })
  return resetPassword;

}
const resetPassword = async(id,token,password)=>{
  const data = await ResetPassword.findOne({userId:id,token:token});
  if(!data || resetPassword.isUsed || data.token !== token) {
    throw {
      statusCode:404,
      message:"Invalid token"
    }
  }
  if(data.expiresAt < Date.now()){
    throw {
      statusCode:404,
      message:"Token expired"
    }
  }
  const hashedPassword = bcrypt.hashSync(password,10);
  await User.findByIdAndUpdate(data.userId,{password:hashedPassword});
  await ResetPassword.findByIdAndUpdate(data._id,{isUsed:true});
  return {message:"Password reset successfully"}

}


export default { login, register ,forgotPassword,resetPassword};