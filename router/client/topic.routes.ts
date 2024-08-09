import { Router } from "express";
import * as Controller from "../../controller/client/topic.controller"
const router:Router = Router()

router.get("/", Controller.topic)
export const topicRoutes :Router = router   