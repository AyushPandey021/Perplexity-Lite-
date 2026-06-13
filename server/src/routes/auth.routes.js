import { Router } from "express";
import { login, register, verifyEmail } from "../controller/auth.controller.js";
import { registerRules, loginRules, validateRequest } from "../validators/auth.validator.js";

const authRouter = Router();

authRouter.post("/register", registerRules, validateRequest, register);

authRouter.get("/verify-email", verifyEmail
);

authRouter.post("/login", loginRules, validateRequest, login);

export default authRouter;
