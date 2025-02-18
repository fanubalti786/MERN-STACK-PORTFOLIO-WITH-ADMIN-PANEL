import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },

    proficiency: {
        type: String,
        required: [true, "Proficiency is required"]
    },
    svg: {  
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,    
            required: true
        }
    }
},{timestamps: true});

export const Skill = mongoose.model("Skill", skillSchema);