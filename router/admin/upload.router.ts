import { Router } from "express";
import multer from "multer"
const router :Router = Router()
import * as Controller from "../../controller/admin/upload.controller"
import * as UploadCloud from "../../middlewares/admin/uploadCloud.middleware"
const upload = multer()
router.post("/",
    upload.single("file"),
    UploadCloud.uploadSingle,
    Controller.index
)
export const uploadRouter = router