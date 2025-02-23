import { Application } from "../models/application.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import  ErrorHandler  from "../utils/ApiError.js";
import { uploadOnCloudinary,deleteOnCloudinary } from "../utils/Cloudinary.js";

const getAllApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find();
  return res
    .status(200)
    .json(
      new ApiResponse(200, applications, "Applications fetched successfully")
    );
});

const addApplication = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    throw new ErrorHandler("name is required", 400);
  }
  if (!req.files || !req.files.svg) {
    throw new ErrorHandler("svg is required", 400);
  }
  const svgPath = req.files.svg.tempFilePath;
  if (!svgPath) {
    throw new ErrorHandler("Server error", 500);
  }
  const svg = await uploadOnCloudinary(svgPath, "PORTFOLIO_APPLICATIONS");
  if (!svg || !svg.error) {
    throw new ErrorHandler("Server error", 500);
  }
  const newApplication = await Application.create({
    name,
    svg: { public_id: svg.public_id, url: svg.url },
  });
  return res
    .status(201)
    .json(
      new ApiResponse(201, newApplication, "Application added successfully")
    );
});

const deleteApplication = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedApplication = await Application.findByIdAndDelete(id);
  if (!deletedApplication) {
    throw new ErrorHandler("Application not found or already deleted", 404);
  }
  await deleteOnCloudinary(deletedApplication.svg.public_id);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        deletedApplication,
        "Application deleted successfully"
      )
    );
});

export {deleteApplication,addApplication,getAllApplications}