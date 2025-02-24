import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
dotenv.config();

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Name is required"],
    },

    email: {
        type: String,
        required: [true, "Email is required"],
    },

    phone: {
        type: String,
        required: [true, "Number is required"],
    },
    
    aboutMe: {
        type: String,
        required: [true, "AboutMe is required"],
    },

    password: {
        type: String,
        required: [true, "password is required"],
        minLength: [8, "Password must be at least 8 characters long"],
    },

    resume: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },

    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },

    

    portfolio: {
        
        type: String,
        required: [true, "Portfolio is required"],
        
    },

    githubUrl:String,
    instagramUrl:String,
    linkedinUrl:String,
    facebookUrl:String,
    resetpasswordToken: String,
    resetpasswordExpire: Date
}, {timestamps: true});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
    {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    
});


userSchema.methods.comparePassword = async function (password) {
    console.log(this.password);
    return await bcrypt.compare(password, this.password);
};


userSchema.methods.generatejsonwebtoken = function () {
    console.log(process.env.JWT_SECRET_KEY);
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};


userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetpasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetpasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}



export const User = mongoose.model("User", userSchema)