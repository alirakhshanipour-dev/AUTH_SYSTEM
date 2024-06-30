import { Router } from "express";
import { UserService } from "../modules/user/user.service.js";

const router = Router()
router.post("/register", UserService.register)
router.post("/login", UserService.login)

export { router as AuthenticationRoutes }