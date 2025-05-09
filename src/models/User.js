import mongoose from "mongoose";
import { EMAIL_REGEX } from "../constants/regex.js";

const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
    },
    job: String,
    address: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 30,
    },
    bio: {
        type: String,

    },
    email: {
        type: String,
        required: true,
        unique: [true || "Number is already userd."],
        trim:  true,
        lowercase: true,
        validate:{
            validator:(email)=>{
               return EMAIL_REGEX.test(email);
            },
            message:"Please provide a valid email address."
        }
    },
    number: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        minlength: 8,


    },
    confirmPassword: {
        type: String,
        minlength: 8,
    },
    profileImageUrl: String,
    roles: {
        type: [String],
        uppercase: true,
        default: ["USER"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }

});
const model= mongoose.model("User",userSchema);
export default model;