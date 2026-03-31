import { Router } from "express";
import { registerEmployer, loginEmployer } from "../controllers/employer.controller.js";

const router = Router();

router.route("/register").post(registerEmployer);
router.route("/login").post(loginEmployer);

export default router;
