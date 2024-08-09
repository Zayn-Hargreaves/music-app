import { Router } from "express";
import * as Controller from "../../controller/client/home.controller"
const router:Router = Router()

router.get("/", Controller.index)
export const homeRoutes :Router = router   