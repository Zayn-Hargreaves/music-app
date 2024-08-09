import { Express, Router } from "express";
import * as Controller from "../../controller/client/song.controller"
const router:Router = Router()

router.get("/:slugTopics", Controller.song)
router.get("/detail/:slugSong", Controller.detail)
router.patch("/like/:typeLike/:idSongs", Controller.like)
router.patch("/favorite/:typeFavorite/:idSongs", Controller.favorite)
router.patch("/listen/:idSongs", Controller.listen)

export const songRoutes :Router = router   