import { asyncHandler } from "../utils/AsyncHandler";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import User from "../models/user.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";


export const registerUser = asyncHandler(async (req, res) => {

    if(!req.files || !req.files.length > 0){
        throw new ErrorHandler("avatar and resume both are required", 400);
    };


    const avatarPath = req.files.avatar.tempFilePath;
    const resumePath = req.files.resume.tempFilePath;

    if(!avatarPath || !resumePath){
        throw new ErrorHandler("avatar and resume both are required", 400);
    };

    const avatar = await uploadOnCloudinary(avatarPath, "AVATARS");
    const resume = await uploadOnCloudinary(resumePath, "RESUMES");

    if(!avatar || resume.error || !resume || !avatar.error){
        throw new ErrorHandler("Server error", 500);
    };





});
    // const { fullName, email, phone, aboutMe, password } = req.body;
    // if (!fullName || !email || !phone || !aboutMe || !password) {
    //     throw new ErrorHandler("All fields are required", 400);
    // }    
    // const user = await User.create({ fullName, email, phone, aboutMe, password });
    // return res.status(201)
    // .json(new ApiResponse(201, user, "User registered successfully"));