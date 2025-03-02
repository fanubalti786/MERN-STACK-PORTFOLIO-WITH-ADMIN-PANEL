import { asyncHandler } from "../utils/AsyncHandler.js";
import ErrorHandler  from "../utils/ApiError.js";
import {User} from "../models/user.js";
import ApiResponse  from "../utils/ApiResponse.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/Cloudinary.js";
import { sendEmail } from "../utils/send.Email.js";
import crypto from "crypto";
import { log } from "console";

 const registerUser = asyncHandler(async (req, res) => {

  const existedUser = await User.findOne({email: req.body.email});
  if(existedUser){
    throw new ErrorHandler("User already exists", 400)
  }
  console.log("its true");
  console.log(req.files);

  if (!req.files || !req.files.avatar || !req.files.resume) {
    console.log("don't recive any file")
    throw new ErrorHandler("avatar and resume both are required ", 400);
  }



  const avatarPath = req.files.avatar.tempFilePath;
  const resumePath = req.files.resume.tempFilePath;

  if (!avatarPath || !resumePath) {
    throw new ErrorHandler("avatar and resume path is required", 400);
  }

  const avatar = await uploadOnCloudinary(avatarPath, "AVATARS");
  const resume = await uploadOnCloudinary(resumePath, "RESUMES");
  console.log(avatar.url, resume.url);

  if (!avatar || resume.error || !resume || avatar.error) {
    throw new ErrorHandler("Server error while uploading", 500);
  }

  const {
    fullName,
    email,
    phone,
    aboutMe,
    password,
    portfolio,
    githubUrl,
    instagramUrl,
    linkedinUrl,
    twitterUrl,
    facebookUrl,
  } = req.body;

  if (
    [fullName, email, phone, aboutMe, password, portfolio].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }


  const user = await User.create({
    fullName,
    email,
    phone,
    aboutMe,
    password,
    portfolio,
    githubUrl,
    instagramUrl,
    linkedinUrl,
    twitterUrl,
    facebookUrl,
    avatar: {
      public_id: avatar.public_id,
      url: avatar.secure_url,
    },
    resume: {
      public_id: resume.public_id,
      url: resume.secure_url,
    },
  });

  if (!user) {
    throw new ErrorHandler("Server error", 500);
  }

  const newUser = await User.findById(user._id).select("-password");

  return res
    .status(201)
    .json(new ApiResponse(201, newUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ErrorHandler("All fields are required", 400);
  }

  const userExist = await User.findOne({ email });

  if (!userExist) {
    throw new ErrorHandler("password or email incorrect", 404);
  }

  const isPasswordCorrect = await userExist.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ErrorHandler("email or password incorrect");
  }

  const token = userExist.generatejsonwebtoken();

  const user = await User.findById(userExist._id).select("-password");

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(201)
    .cookie("token", token, options)
    .json(
      new ApiResponse(201, { ...user, token }, "User logged in successfully")
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("token", null, options)
    .json(new ApiResponse(200, null, "User Logged Out Successfully"));
});

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetched successfully"));
});

const updateProfile = asyncHandler(async (req, res) => {
  const newUserData = {
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    aboutMe: req.body.aboutMe,
    portfolioUrl: req.body.portfolioUrl,
    githubUrl: req.body.githubUrl,
    instagramUrl: req.body.instagramUrl,
    linkedinUrl: req.body.linkedinUrl,
    twitterUrl: req.body.twitterUrl,
    facebookUrl: req.body.facebookUrl,
  };

  if (req.files && req.files.avatar) {
    const user = await User.findById(req.userId);
    const avatarId = user.avatar.public_id;
    const avatarPath = req.files.avatar.tempFilePath;
    console.log(avatarPath)
    if (!avatarPath) {
      throw new ErrorHandler("server error", 500);
    }
    await deleteOnCloudinary(avatarId);
    const avatar = await uploadOnCloudinary(avatarPath, "AVATARS");
    if (!avatar || avatar.error) {
      throw new ErrorHandler("Server error", 500);
    }
    newUserData.avatar = {
      public_id: avatar.public_id,
      url: avatar.url,
    };
  }

  if (req.files && req.files.resume) {
    const user = await User.findById(req.userId);
    const resumeId = user.resume.public_id;
    const resumePath = req.files.resume.tempFilePath;
    if (!resumePath) {
      throw new ErrorHandler("server error", 500);
    }
    await deleteOnCloudinary(resumeId);
    const resume = await uploadOnCloudinary(resumePath, "RESUMES");
    if (!resume || resume.error) {
      throw new ErrorHandler("Server error", 500);
    }
    newUserData.resume = {
      public_id: resume.public_id,
      url: resume.url,
    };
  }

  const user = await User.findByIdAndUpdate(req.userId, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res
    .status(200)
    .json(new ApiResponse(200, user, "Profile Updated Successfully!"));
});

const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    throw new ErrorHandler("All fields are required", 400);
  }

  if (newPassword !== confirmPassword) {
    throw new ErrorHandler(
      "new password and confirm password do not match",
      400
    );
  }

  const user = await User.findById(req.userId).select("+password");

  if (!user) {
    throw new ErrorHandler("User not found", 404);
  }

  const isPasswordCorrect = await user.comparePassword(currentPassword);

  if (!isPasswordCorrect) {
    throw new ErrorHandler("Current password is incorrect", 400);
  }

  user.password = newPassword;
  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, user, "Password updated successfully"));
});

const getUserForPortfolio = asyncHandler(async (req, res) => {
  const user = await User.findById("67bbfcf6f42e50793c938257");
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetched successfully"));
});

const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ErrorHandler("Email is required", 400);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ErrorHandler("User not found", 404);
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });
  

  //http://google.com
  const resetPasswordUrl = `${process.env.DASHBOARD_URL}/password/reset/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetPasswordUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      message,
    });

    res.status(200).json(new ApiResponse(200, user, "Email sent successfully"));
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    throw new ErrorHandler("Email could not be sent", 500);
  }
});


const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  if (!token || !password || !confirmPassword) {
    throw new ErrorHandler("All fields are required", 400);
  }

  if (password !== confirmPassword) {
    throw new ErrorHandler(
      "new password and confirm password do not match",
      400
    );
  }

  
  const resetpasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");



    console.log(resetpasswordToken);


  const user = await User.findOne({
    resetpasswordToken,
    resetpasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new ErrorHandler("Invalid your token or token has expired", 400);
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200)
  .json(new ApiResponse(200, user, "Password updated successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateProfile,
  updatePassword,
  getUserForPortfolio,
  forgetPassword,
  resetPassword
};
