import { Express } from "express";
import { topicRoutes } from "./topic.routes";
import { songRoutes } from "./song.router";
import { searchRoutes } from "./search.router";
import { homeRoutes } from "./home.router";
import { userRoutes } from "./user.router";
import * as infoUserMiddleware from "../../middlewares/client/infoUser.middleware"
import { favoriteSongRoutes } from "./favorite-song.router";
import SettingGeneral1 from "../../middlewares/client/setting.middleware";

const clientRoutes =(app:Express):void =>{
    app.use(infoUserMiddleware.infoUser)
    app.use(SettingGeneral1)
    app.use("/", homeRoutes)
    app.use("/topics", topicRoutes)
    app.use("/songs", songRoutes)
    app.use("/search", searchRoutes)
    app.use("/user", userRoutes)
    app.use("/favorite-song", favoriteSongRoutes )
}
export default clientRoutes