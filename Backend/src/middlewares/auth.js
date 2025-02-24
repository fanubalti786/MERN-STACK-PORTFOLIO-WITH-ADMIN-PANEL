
import dotenv from "dotenv";
import { asyncHandler } from "../utils/AsyncHandler.js";
import  ErrorHandler  from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
dotenv.config()



const isAuthenticated = asyncHandler(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        throw new ErrorHandler("Please login to access this resource", 401);
    }

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // req.user = await User.findById(decoded.id);
    req.userId = decoded.id;

    next()
});

export { isAuthenticated };