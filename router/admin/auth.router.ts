import { Router } from "express";
const router = Router()
import * as controller from "../../controller/admin/auth.controller"
import * as validate from "../../validate/admin/auth.validate"
router.get("/login",controller.login);
router.post("/login",
    validate.LoginPost, 
    controller.loginPost)
router.get("/logout",controller.logout)
export const authRouter = router;