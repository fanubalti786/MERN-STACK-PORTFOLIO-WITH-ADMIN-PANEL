import { v2 as cloudinary } from "cloudinary";

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


export const deleteOnCloudinary = async (id) => {
  //delete the file on cloudinary
  await cloudinary.uploader.destroy(id);
};


