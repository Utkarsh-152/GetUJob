import { Router } from "express";
import { registerJobSeeker, loginJobSeeker } from "../controllers/jobseeker.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/register").post(upload.fields([
    {
        name: "profilePhoto", 
        maxCount: 1
    }
]),registerJobSeeker)

router.route("/login").post(loginJobSeeker)


export default router
