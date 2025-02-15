import { v2 as cloudinary } from "cloudinary";
import { asyncHandler } from "./AsyncHandler";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (memoryFilePath,fileName) => {
  //uplaod the file on cloudinary
  const response = await cloudinary.uploader.upload(memoryFilePath, {
    folder: fileName,
  });
  return response;
};


