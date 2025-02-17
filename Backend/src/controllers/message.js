import { asyncHandler } from "../utils/AsyncHandler.js";
import Message from "../models/message.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js"


export const sendMessage = asyncHandler(async (req, res) => {
    const { senderName, subject, message } = req.body;
    if (!senderName || !subject || !message) {
        throw new ErrorHandler("All fields are required", 400);
    }
    const newMessage = await Message.create({ senderName, subject, message });
    return res.status(201)
    .json(new ApiResponse(201, newMessage, "Message sent successfully"));

});



export const getAllMessages = asyncHandler(async (req, res) => {
    const messages = await Message.find();
    return res.status(200)
    .json(new ApiResponse(200, messages, "Messages fetched successfully"));
});


export const deleteMessage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedMessage = await Message.findByIdAndDelete(id);
    if (!deletedMessage) {
        throw new ErrorHandler("Already deleted or not found", 404);
    }
    return res.status(200)
    .json(new ApiResponse(200, deletedMessage, "Message deleted successfully"));
});