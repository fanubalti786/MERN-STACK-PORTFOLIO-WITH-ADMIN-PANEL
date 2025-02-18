import mongoose from "mongoose";

const timeLineSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },

    timeline: {
        from: {
            type: String,
            required: [true, "TimeLine starting date is required!"]
        },
        to: String
    }
},{timestamps: true});

export const TimeLine = mongoose.model("TimeLine", timeLineSchema)