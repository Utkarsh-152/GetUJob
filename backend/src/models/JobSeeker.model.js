import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const jobSeekerSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    experience: {
        type: [Object],
        required: false,
    },
    education: {
        type: [Object],
        required: false,
    },
    skills: {
        type: [Object],
        required: false,
    },
    projects: {
        type: [Object],
        required: false,
    },
    certifications: {
        type: [Object],
        required: false,
    },
    resume: {
        type: String,
        required: false,
    },
    referralsMatched: {
        type: Number,
        required: false,
        default: 0,
    },
    refreshToken: {
        type: String,
    },
}, {timestamps: true})

jobSeekerSchema.pre("save", async function(){
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
})  

jobSeekerSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}


jobSeekerSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullname: this.fullname,
            username: this.username,
            companyName: this.companyName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

jobSeekerSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const JobSeeker = mongoose.model('JobSeeker', jobSeekerSchema)