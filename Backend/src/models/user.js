import mongoose from "mongoose";

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
        select: false
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

    Resume: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
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
});


export const User = mongoose.model("User", userSchema)