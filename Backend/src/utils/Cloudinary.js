// import * as dotenv from "dotenv";
// dotenv.config({ path: "../../development.env" });
import { v2 as cloudinary } from "cloudinary";

// Configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

cloudinary.config({
  cloud_name: "dndox5eas",
  api_key: "285194879346813",
  api_secret: "_1np5PchIRGQVeIUY_HvsWS7dhw",
});

 const uploadOnCloudinary = async (memoryFilePath,fileName) => {
  //uplaod the file on cloudinary
  const response = await cloudinary.uploader.upload(memoryFilePath, {
    folder: fileName,
  });
  console.log("Uploaded file url:", response.url);
  return response;
};


 const deleteOnCloudinary = async (id) => {
  //delete the file on cloudinary
  await cloudinary.uploader.destroy(id);
};
export {deleteOnCloudinary,uploadOnCloudinary};

