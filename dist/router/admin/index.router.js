"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var congfix_1 = require("../../config/congfix");
var dashboard_router_1 = require("./dashboard.router");
var song_router_1 = require("./song.router");
var upload_router_1 = require("./upload.router");
var topic_router_1 = require("./topic.router");
var singer_router_1 = require("./singer.router");
var roles_router_1 = require("./roles.router");
var auth_router_1 = require("./auth.router");
var accounts_router_1 = require("./accounts.router");
var users_router_1 = require("./users.router");
var setting_general_router_1 = require("./setting-general.router");
var middleware = __importStar(require("../../middlewares/admin/auth.middleware"));
var adminRouter = function (app) {
    var PATH_ADMIN = "/".concat(congfix_1.systemConfig.prefixAdmin);
    app.use("".concat(PATH_ADMIN, "/dashboard"), middleware.requireAuth, dashboard_router_1.dashboardrouter);
    app.use("".concat(PATH_ADMIN, "/topics"), middleware.requireAuth, topic_router_1.topicRoutes);
    app.use("".concat(PATH_ADMIN, "/songs"), middleware.requireAuth, song_router_1.songRouter);
    app.use("".concat(PATH_ADMIN, "/upload"), upload_router_1.uploadRouter);
    app.use("".concat(PATH_ADMIN, "/singers"), middleware.requireAuth, singer_router_1.singerRoutes);
    app.use("".concat(PATH_ADMIN, "/roles"), middleware.requireAuth, roles_router_1.roleRouter);
    app.use("".concat(PATH_ADMIN, "/auth"), auth_router_1.authRouter);
    app.use("".concat(PATH_ADMIN, "/accounts"), middleware.requireAuth, accounts_router_1.accountRouter);
    app.use("".concat(PATH_ADMIN, "/users"), middleware.requireAuth, users_router_1.usersRouter);
    app.use("".concat(PATH_ADMIN, "/settings/general"), middleware.requireAuth, setting_general_router_1.settingGeneralrouter);
};
exports.default = adminRouter;
