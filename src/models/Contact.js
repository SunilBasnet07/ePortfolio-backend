import mongoose from "mongoose";
import { EMAIL_REGEX } from "../constants/regex.js";

const contactSchema=new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [50, 'Name must not exceed 50 characters'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        validate:{
            validator:(value)=>{
               return  EMAIL_REGEX.test(value);
            },
            message:"Please provide a valid email address."
        }
      },
      subject: {
        type: String,
        required: [true, 'Subject is required'],
        trim: true,
        minlength: [5, 'Subject must be at least 5 characters'],
        maxlength: [100, 'Subject must not exceed 100 characters'],
      },
      message: {
        type: String,
        required: [true, 'Message is required'],
        minlength: [10, 'Message must be at least 10 characters long'],
      },
      submittedAt: {
        type: Date,
        default: Date.now(),
      },
});
const Contact = mongoose.model("Contact",contactSchema);
export default Contact;

