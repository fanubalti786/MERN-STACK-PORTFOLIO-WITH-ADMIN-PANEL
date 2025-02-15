import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderName: {
        type: String,
        minLength: [3, "Name must be at least 3 characters long"],
    },
    subject: {
        type: String,
        minLength: [3, "Name must be at least 3 characters long"],

    },
    message: {
        type: String,
        minLength: [3, "Name must be at least 3 characters long"],
        
    },
},{timestamps: true});

export const Message = mongoose.model("Message", messageSchema);
