import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {JobSeeker} from "../models/JobSeeker.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"


const generateAccessTokenAndRefreshToken = async(jobSeekerId) => {
    try {
        const jobSeeker = await JobSeeker.findById(jobSeekerId)
        const accessToken = jobSeeker.generateAccessToken()
        const refreshToken = jobSeeker.generateRefreshToken()
        
        jobSeeker.refreshToken = refreshToken
        await jobSeeker.save({ValidateBeforeSave: false})

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "something went wrong while generating access token and refresh token")
    }
}



const registerJobSeeker = asyncHandler(async (req, res) => {

        console.log("req.body", req.body)

        const {
            fullname,
            email,
            username,
            password,
            experience,
            education,
            skills,
            projects,
            certifications,
            resume
        } = req.body
        
        if ([
            fullname,
            email,
            username,
            password,
        ].some((field)=> field?.trim()==="")
        ) {
            throw new ApiError(400, "All required fields must be provided")
        }

        console.log("all required fields are provided")
        
        const existedJobSeeker = await JobSeeker.findOne({
            $or: [{ email }, { username }]
        })

        console.log("existedJobSeeker", existedJobSeeker)
        
        if(existedJobSeeker) {
            throw new ApiError(409, "User with Email or Username already exists")
        }

        console.log("user does not exist")

        let profilePhotoUrl = null;
        const profilePhotoLocalPath = req.files?.profilePhoto[0]?.path;

        if (profilePhotoLocalPath) {
            profilePhotoUrl = await uploadOnCloudinary(profilePhotoLocalPath);
        }

        console.log("profilePhotoUrl", profilePhotoUrl)

        const jobSeeker = await JobSeeker.create({
            fullname,
            profilePhoto: profilePhotoUrl?.url,
            username: username.toLowerCase(),
            email,
            password,
            experience,
            education,
            skills,
            projects,
            certifications,
            resume
        })

        console.log("jobSeeker", jobSeeker)

        const createdJobSeeker = await JobSeeker.findById(jobSeeker._id).select("-password -refreshToken")

        console.log("createdJobSeeker", createdJobSeeker)

        if(!createdJobSeeker) {
            throw new ApiError(500, "Something went wrong while registering the job seeker")
        }

        return res.status(201).json(
        new ApiResponse(200, createdJobSeeker, "Job Seeker created successfully")
    )
})

const loginJobSeeker = asyncHandler(async (req, res) => {
    // get user details from frontend
    const {email, password} = req.body
    
    // username or email
    if(!email) {
        throw new ApiError(400, "Email is required")
    }

    // find the user in db
    const user = await JobSeeker.findOne({
        $or: [{ email }]
    })

    if (!user) {
        throw new ApiError(401, "User not found")
    }
    
    // if user found then check for password
    const isPassValid = await user.isPasswordCorrect(password)

    if (!isPassValid) {
        throw new ApiError(401, "Invalid password")
    }

    // access and refresh token generation
    const {accessToken, refreshToken} = await generateAccessTokenAndRefreshToken(user._id)

    // send them in cookies
    const loggedInUser = await JobSeeker.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    // return user response
    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", accessToken, options)
        .json( new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged in successfully"
        ))

})

export {registerJobSeeker, loginJobSeeker}