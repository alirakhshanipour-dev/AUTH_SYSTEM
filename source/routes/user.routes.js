import { Router } from "express";
import { UserController } from "../modules/user/user.controller.js";

const router = Router()
router.post("/create", UserController.createUser)
router.get("/list", UserController.getUsers)
router.get("/:id", UserController.getUser)

export { router as UserRoutes }
