import { Project } from "../models/project.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import  ErrorHandler  from "../utils/ApiError.js";
import { uploadOnCloudinary ,deleteOnCloudinary} from "../utils/Cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";



const getAllProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find();
    return res
        .status(200)
        .json(new ApiResponse(200, projects, "Projects fetched successfully"));
});

const getSingleProject = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
        throw new ErrorHandler("Project not found", 404);
    }
    return res
        .status(200)
        .json(new ApiResponse(200, project, "Project fetched successfully"));
});

const addProject = asyncHandler(async (req, res) => {
    const { title, description, gitRepoLink, projectLink, technologies, stack, deployed } = req.body;

    if (!title || !description || !technologies || !stack || !deployed) {
        throw new ErrorHandler("All fields are required", 400);
    }

    if (!req.files || !req.files.projectBanner) {
        throw new ErrorHandler("projectBanner is required", 400);
    }

    const BannerPath = req.files.projectBanner.tempFilePath;
    if (!BannerPath) {
        throw new ErrorHandler("Server error", 500);
    }

    const Banner = await uploadOnCloudinary(BannerPath, "PORTFOLIO_PROJECTS_BANNERS");
    if (!Banner || Banner.error) {
        throw new ErrorHandler("Cloudinary error", 500);
    }

    const newProject = await Project.create({
        title,
        description,
        image: Banner.url,
        gitRepoLink,
        projectLink,
        technologies,
        stack,
        deployed,
        projectBanner: {
            public_id: Banner.public_id,
            url: Banner.url,
        }
    });

    return res
        .status(201)
        .json(new ApiResponse(201, newProject, "Project added successfully"));
});

const deleteProject = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
        throw new ErrorHandler("Project not found or already deleted", 404);
    }
    await deleteOnCloudinary(deletedProject.projectBanner.public_id);
    return res
        .status(200)
        .json(new ApiResponse(200, deletedProject, "Project deleted successfully"));
}); 

const updateProject = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
        throw new ErrorHandler("Project not found", 404);
    }

    console.log("irfan")

   

    const newData = {
        title: req.body.title,
        description: req.body.description,
        gitRepoLink: req.body.gitRepoLink,
        projectLink: req.body.projectLink,
        technologies: req.body.technologies,
        stack: req.body.stack,
        deployed: req.body.deployed
    };
    console.log(req.body.title);

    if(!req.body.title || !req.body.description || !req.body.technologies || !req.body.stack || !req.body.deployed) {
        throw new ErrorHandler("All fields are required", 400);
    }
    console.log("irfan")

    if (req.files && req.files.projectBanner) {
        const projectBannerId = project.projectBanner.public_id;
        const projectBannerPath = req.files.projectBanner.tempFilePath;
        if (!projectBannerPath) {
            throw new ErrorHandler("server error", 500);
        }
        const projectBanner = await uploadOnCloudinary(projectBannerPath, "PORTFOLIO_PROJECTS_BANNERS");
        if (!projectBanner || projectBanner.error) {
            throw new ErrorHandler("Server error", 500);
        }
        await deleteOnCloudinary(projectBannerId);
        newData.projectBanner = {
            public_id: projectBanner.public_id,
            url: projectBanner.url,
        };

    }

    const updatedProject = await Project.findByIdAndUpdate(id, newData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    if(!updatedProject) {    
        throw new ErrorHandler("Server error", 500);
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedProject, "Project updated successfully"));
});

export {
    getAllProjects,
    addProject,
    deleteProject,
    updateProject,
    getSingleProject

}