import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    name: String,
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

export const Application = mongoose.model("Application", applicationSchema);