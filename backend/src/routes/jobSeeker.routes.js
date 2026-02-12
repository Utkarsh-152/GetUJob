import { Router } from "express";
import { registerJobSeeker } from "../controllers/jobseeker.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/register").post(upload.fields([
    {
        name: "profilePhoto", 
        maxCount: 1
    }
]),registerJobSeeker)

export default router
