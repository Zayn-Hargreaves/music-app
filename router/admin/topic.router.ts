import { Router } from "express";
import * as controller from "../../controller/admin/topic.controller"
import multer from "multer"
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware"
const upload = multer()
const router = Router()
router.get("/", controller.index)
router.patch("/change-status/:status/:id", controller.changeStatus);
router.get("/create", controller.create)
router.post("/create",
    upload.single("avatar"),
    uploadCloud.uploadSingle , controller.createPost)
router.get("/edit/:id", controller.edit)
router.patch("/edit:id",
    upload.single("avatar"),
    uploadCloud.uploadSingle , controller.editPatch)
router.get("/detail/:topicId", controller.detail)
router.delete("/delete/:id", controller.deleted)
export const topicRoutes = router