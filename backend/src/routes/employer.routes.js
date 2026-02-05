import { Router } from "express";
import { registerEmployer    } from "../controllers/employer.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/register").post(upload.fields([
    {
        name: "profilePhoto", 
        maxCount: 1
    }
]),registerEmployer)

export default router
