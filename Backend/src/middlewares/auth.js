import { User } from "../models/user";
import { asyncHandler } from "../utils/AsyncHandler";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import jwt, { verify } from "jsonwebtoken";



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