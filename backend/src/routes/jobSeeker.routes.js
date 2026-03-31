import { Router } from "express";
import { registerJobSeeker, loginJobSeeker } from "../controllers/jobseeker.controller.js";

const router = Router();

router.route("/register").post(registerJobSeeker);
router.route("/login").post(loginJobSeeker);

export default router;
