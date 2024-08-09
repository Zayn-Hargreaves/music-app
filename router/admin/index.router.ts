import { Express } from "express";
import { systemConfig } from "../../config/congfix";
import { dashboardrouter } from "./dashboard.router";
import { songRouter } from "./song.router";
import { uploadRouter } from "./upload.router";
import { topicRoutes } from "./topic.router";
import { singerRoutes } from "./singer.router";
import { roleRouter } from "./roles.router";
import { authRouter } from "./auth.router";
import { accountRouter } from "./accounts.router";
import { usersRouter } from "./users.router";
import { settingGeneralrouter } from "./setting-general.router";
import * as middleware from "../../middlewares/admin/auth.middleware";


const adminRouter = (app:Express): void =>{
    const PATH_ADMIN = `/${systemConfig.prefixAdmin}`
    app.use(`${PATH_ADMIN}/dashboard`, middleware.requireAuth,dashboardrouter )
    app.use(`${PATH_ADMIN}/topics`, middleware.requireAuth,topicRoutes)
    app.use(`${PATH_ADMIN}/songs`,middleware.requireAuth ,songRouter)
    app.use(`${PATH_ADMIN}/upload`, uploadRouter)
    app.use(`${PATH_ADMIN}/singers`, middleware.requireAuth,singerRoutes)
    app.use(`${PATH_ADMIN}/roles`, middleware.requireAuth,roleRouter)
    app.use(`${PATH_ADMIN}/auth`, authRouter)
    app.use(`${PATH_ADMIN}/accounts`, middleware.requireAuth,accountRouter)
    app.use(`${PATH_ADMIN}/users`,middleware.requireAuth ,usersRouter)
    app.use(`${PATH_ADMIN}/settings/general`, middleware.requireAuth,settingGeneralrouter)
    
}

export default adminRouter