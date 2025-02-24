import { Skill } from "../models/skill.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import ErrorHandler from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { uploadOnCloudinary,deleteOnCloudinary } from "../utils/Cloudinary.js";

const getAllSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find();
  console.log(skills);
  return res
    .status(200)
    .json(new ApiResponse(200, skills, "Skills fetched successfully"));
});

const addSkill = asyncHandler(async (req, res) => {
  const { title, proficiency } = req.body;

  if (!title || !proficiency) {
    throw new ErrorHandler("All fields are required", 400);
  }

  if (!req.files || !req.files.svg) {
    throw new ErrorHandler("svg is required", 400);
  }

  const svgPath = req.files.svg.tempFilePath;
  if (!svgPath) {
    throw new ErrorHandler("Server error", 500);
  }

  const svg = await uploadOnCloudinary(svgPath, "PORTFOLIO_SKILLS_SVGS");
  if (!svg || svg.error) {
    throw new ErrorHandler("Server error", 500);
  }

  const skill = await Skill.create({
    title,
    proficiency,
    svg: {
      public_id: svg.public_id,
      url: svg.url,
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, skill, "Skill added successfully"));
});

const deleteSkill = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedSkill = await Skill.findByIdAndDelete(id);
  if (!deletedSkill) {
    throw new ErrorHandler("Skill not found or already deleted", 404);
  }
  await deleteOnCloudinary(deletedSkill.svg.public_id);
  return res
    .status(200)
    .json(new ApiResponse(200, deletedSkill, "Skill deleted successfully"));
});

const updateSkill = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const skill = await Skill.findById(id);

  if (!skill) {
    throw new ErrorHandler("Skill not found", 404);
  }

  const { proficiency } = req.body;

  const updatedSkill = await Skill.findByIdAndUpdate(
    id,
    { proficiency },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  if (!updatedSkill) {
    throw new ErrorHandler("Skill not found or already deleted", 404);
  }
  return res
    .status(200)
    .json(new ApiResponse(200, updatedSkill, "Skill updated successfully"));
});

export { getAllSkills, addSkill, deleteSkill, updateSkill };
