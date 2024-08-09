import { Router } from "express";
import * as controller from "../../controller/admin/dashboard.controller"
const router = Router()
router.get("/", controller.index)
export const dashboardrouter = router