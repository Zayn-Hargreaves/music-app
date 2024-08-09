import { Router } from "express";
import * as Controller from "../../controller/client/favoriteSong.controller"
import * as Middleware from "../../middlewares/client/auth.middleware"
const router:Router = Router()

router.get("/", Middleware.requireAuth,Controller.index)
export const favoriteSongRoutes :Router = router   