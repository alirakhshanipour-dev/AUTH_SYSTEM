import { Router } from "express";
import { UserRoutes } from "./user.routes.js";
import { AuthenticationRoutes } from "./auth.routes.js";
import { authenticateJWT, authorizeRoles } from "../middlewares/authenticateUser.js";

const router = Router()
router.use("/user", authenticateJWT, authorizeRoles("user", "admin", "guest"), UserRoutes)
router.use("/auth", AuthenticationRoutes)
export { router as MainRoutes }
