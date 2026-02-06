import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {Employer} from "../models/employer.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"


const generateAccessTokenAndRefreshToken = async(employerId) => {
    try {
        const employer = await Employer.findById(employerId)
        const accessToken = employer.generateAccessToken()
        const refreshToken = employer.generateRefreshToken()
        
        employer.refreshToken = refreshToken
        await employer.save({ValidateBeforeSave: false})

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "something went wrong while generating access token and refresh token")
    }
}



const registerEmployer = asyncHandler(async (req, res) => {

        console.log("req.body", req.body)

        const {
            fullname,
            email,
            username,
            password,
            companyName,
            referralsLeft,
            companyEmail,
            companyWebsite
        } = req.body
        
        if ([
            fullname,
            email,
            username,
            password,
            companyName,
            companyEmail
        ].some((field)=> field?.trim()==="")
        ) {
            throw new ApiError(400, "All required fields must be provided")
        }

        console.log("all required fields are provided")
        
        const existedEmployer = await Employer.findOne({
            $or: [{ email }, { username }]
        })

        console.log("existedEmployer", existedEmployer)
        
        if(existedEmployer) {
            throw new ApiError(409, "User with Email or Username already exists")
        }

        console.log("user does not exist")

        let profilePhotoUrl = null;
        const profilePhotoLocalPath = req.files?.profilePhoto[0]?.path;

        if (profilePhotoLocalPath) {
            profilePhotoUrl = await uploadOnCloudinary(profilePhotoLocalPath);
        }

        console.log("profilePhotoUrl", profilePhotoUrl)

        const employer = await Employer.create({
            fullname,
            profilePhoto: profilePhotoUrl?.url,
            companyName,
            referralsLeft,
            companyEmail,
            companyWebsite,
            username: username.toLowerCase(),
            email,
            password
        })

        console.log("employer", employer)
        
        const createdEmployer = await Employer.findById(employer._id).select("-password -refreshToken")

        console.log("createdEmployer", createdEmployer)

        if(!createdEmployer) {
            throw new ApiError(500, "Something went wrong while registering the employer")
        }

    return res.status(201).json(
        new ApiResponse(200, createdEmployer, "Employer created successfully")
    )
})

export {registerEmployer}