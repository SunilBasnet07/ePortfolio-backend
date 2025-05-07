import mongoose from "mongoose";

const projectSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength:100,
      },
      description: {
        type: String,
        required: true,
        minlength: 10,
      },
      techStack: {
        type: [String],
        required: true,
        // validate: {
        //   validator: function (arr) {
        //     return arr.length > 0;
        //   },
        //   message: 'At least one technology is required in tech stack',
        // },
      },
      imageUrl: {
        type: String,
        required: true,
        // match: [/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/, 'Please provide a valid image URL'],
      },
      githubUrl: {
        type: String,
        required: true,
        // match: [/^https?:\/\/(www\.)?github\.com\/.+$/, 'Please provide a valid GitHub URL'],
      },
      liveUrl: {
        type: String,
        required: true,
        // match: [/^https?:\/\/.+$/, 'Please provide a valid live demo URL'],
      },
      createdAt: {
        type: Date,
        default: Date.now(),
        
      },
      createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
      }
});
const Project= mongoose.model("Project",projectSchema);
export default Project;