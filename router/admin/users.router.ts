import { Router } from "express";
const router = Router();
import multer from "multer"
const upload = multer()
import * as controller from "../../controller/admin/users.controller"
router.get("/",controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.get("/detail/:id", controller.detail)
router.delete("/delete/:id", controller.deleted)
export const usersRouter = router;