import app from "./app.js";
import {v2 as cloudinary} from "cloudinary";


// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });




app.listen(process.env.PORT, ()=>
{
    console.log(`Server is running on ${process.env.PORT}`);
});

console.log("its a port number: ",process.env.PORT)