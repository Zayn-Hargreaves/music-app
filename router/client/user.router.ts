import { Router } from "express";
import * as Controller from "../../controller/client/user.controller"
import * as Validate from "../../validate/client/auth.validate"
import multer from "multer"
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware"
const upload = multer()
import * as Middleware from "../../middlewares/client/auth.middleware"
const router:Router = Router()

router.get("/login", Controller.login)
router.post("/login", Controller.loginPost)
router.get("/register", Controller.register)
router.post("/register",Validate.register, Controller.registerPost)
router.get("/logout", Controller.logout)
router.get("/password/forgot", Controller.forgotPassword)
router.post("/password/forgot", Validate.forgotPasswordPost, Controller.forgotPasswordPost)
router.get("/password/otp", Controller.otpPassword)
router.post("/password/otp",Controller.otpPasswordPost)
router.get("/password/reset-password", Controller.resetPassword)
router.post("/password/reset-password",Validate.resetPasswordPost ,Controller.resetPasswordPost)
router.get("/info",Middleware.requireAuth, Controller.info)
router.get("/edit",Middleware.requireAuth, Controller.edit)
router.patch("/edit",Middleware.requireAuth, upload.single("avatar"), uploadCloud.uploadSingle, Controller.editPatch)

export const userRoutes :Router = router   