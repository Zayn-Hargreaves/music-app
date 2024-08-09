import { Router } from "express";
import * as controller from "../../controller/admin/song.controller"
import multer from "multer"
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware"
const upload = multer()
const router = Router()
router.get("/", controller.index)
router.get("/create", controller.create)
router.patch("/change-status/:status/:id", controller.changeStatus);
router.post("/create",
    upload.fields(
        [
            {name:'avatar', maxCount:1},
            {name:'audio', maxCount:1}
        ]
    ),
    uploadCloud.uploadFields , controller.createPost)
router.get("/edit/:id", controller.edit)
router.patch("/edit/:id",
    upload.fields(
        [
            {name:'avatar', maxCount:1},
            {name:'audio', maxCount:1}
        ]
    ),
    uploadCloud.uploadFields , controller.editPatch)
router.get("/detail/:songId", controller.detail)
router.delete("/delete/:id", controller.deleted)
export const songRouter = router