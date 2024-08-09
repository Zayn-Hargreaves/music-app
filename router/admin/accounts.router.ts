import { Router } from "express";
const router = Router();
import multer from "multer"
const upload = multer()
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware"
import * as controller from "../../controller/admin/accounts.controller"
import * as validate from "../../validate/admin/accounts.validate"
router.get("/",controller.index);
router.get("/create",controller.create)
router.post(
    "/create",
    upload.single("avatar"),
    uploadCloud.uploadSingle,
    validate.createPost,
    controller.createPost)
router.patch("/change-status/:status/:id", controller.changeStatus);

router.get("/edit/:id", controller.edit)
router.patch(
    "/edit/:id",
    upload.single("avatar"),
    uploadCloud.uploadSingle,
    controller.editPatch)
router.patch("/delete/:id", controller.deleted)
export const accountRouter = router;