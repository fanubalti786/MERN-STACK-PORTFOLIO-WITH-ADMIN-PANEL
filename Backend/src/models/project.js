import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    gitRepoLink: String,
    projectLink: String,
    technologies: {
        type: Array,
        required: [true, "Technologies is required"]
    },
    stack: {
        type: Array,
        required: [true, "Stack is required"]
    },
    deployed: {
        type: String,
        required: [true, "Deployed is required"]
    },
    projectBanner: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    
},{timestamps: true});  

export const Project = mongoose.model("Project", projectSchema);
    
