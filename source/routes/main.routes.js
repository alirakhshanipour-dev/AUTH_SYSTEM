import { Router } from "express";
import { UserRoutes } from "./user.routes.js";
import { AuthenticationRoutes } from "./auth.routes.js";
import { authenticateJWT, authorizeRoles } from "../middlewares/authenticateUser.js";
import path from "path"

const router = Router()
router.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public/html/swagger.html'));
});
router.use("/user", authenticateJWT, authorizeRoles("user", "admin", "guest"), UserRoutes)
router.use("/auth", AuthenticationRoutes)
export { router as MainRoutes }
