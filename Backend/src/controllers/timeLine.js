import { asyncHandler } from "../utils/AsyncHandler";
import { ErrorHandler } from "../utils/ErrorHandler";
import TimeLine from "../models/timeLine.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getAllTimeLines = asyncHandler(async (req, res) => {
    const timeLines = await TimeLine.find();
    return res.status(200)
    .json(new ApiResponse(200, timeLines, "TimeLines fetched successfully"));
});

const postTimeLine = asyncHandler(async (req, res) => {
    const { title, description, from, to } = req.body;

    if (!title || !description || !from || !to) {
        throw new ErrorHandler("All fields are required", 400);
    }
    const newTimeLine = await TimeLine.create({ title, description, timeline: { from, to } });
    return res.status(201)
    .json(new ApiResponse(201, newTimeLine, "TimeLine added successfully"));
});



const deleteTimeLine = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedTimeLine = await TimeLine.findByIdAndDelete(id);
    if (!deletedTimeLine) {
        throw new ErrorHandler("TimeLine not found or already deleted", 404);
    }
    return res.status(200)
    .json(new ApiResponse(200, deletedTimeLine, "TimeLine deleted successfully"));
});



export { getAllTimeLines, postTimeLine, deleteTimeLine };