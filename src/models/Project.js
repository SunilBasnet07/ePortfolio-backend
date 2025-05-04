import mongoose from "mongoose";

const projectSchema= new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Project title is required'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters long'],
        maxlength: [100, 'Title cannot exceed 100 characters'],
      },
      description: {
        type: String,
        required: [true, 'Project description is required'],
        minlength: [10, 'Description must be at least 10 characters'],
      },
      techStack: {
        type: [String],
        required: [true, 'Tech stack is required'],
        validate: {
          validator: function (arr) {
            return arr.length > 0;
          },
          message: 'At least one technology is required in tech stack',
        },
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