import { Router } from "express";
import * as controller from "../../controller/admin/settingGeneral.controller"
import multer from "multer"
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware"
const upload = multer()
const router = Router()
router.get("/", controller.general)
router.patch("/",
    upload.single("logo"),
    uploadCloud.uploadSingle,
    controller.generalPatch
)
export const settingGeneralrouter = router