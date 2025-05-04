import User from "../models/User.js"
import bcrypt from "bcrypt";

const login = async (data) => {
  const user = await User.findOne({ email: data.email });
  const isPasswordMatched = bcrypt.compareSync(data.password, user.password);
  if (!isPasswordMatched) {
    throw {
      statusCode: 401,
      message: "Email and Password do not matched.",
    }
  }
  if (!user) throw new Error("User not found");

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
  return await User.create({ ...data, password: hashedPassword });
}


export default { login, register };