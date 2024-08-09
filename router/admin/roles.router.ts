import { Router } from "express";
import * as controller from "../../controller/admin/role.controller"
const router = Router()

router.get("/", controller.index)
router.get("/create", controller.create)
router.post("/create",controller.createPost)
router.delete("/delete/:id", controller.deleteItem);
router.get("/edit/:id", controller.edit)
router.patch("/edit/:id", controller.editPatch)
// router.get("/detail/:id", controller.detail)
router.get("/permissions", controller.permissions)
router.patch("/permissions", controller.permissionsPatch)
router.delete("/delete/:id", controller.deleteItem)
export const roleRouter = router