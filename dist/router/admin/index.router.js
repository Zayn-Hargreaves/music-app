"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var congfix_1 = require("../../config/congfix");
var dashboard_router_1 = require("./dashboard.router");
var topic_router_1 = require("./topic.router");
var song_router_1 = require("./song.router");
var upload_router_1 = require("./upload.router");
var adminRouter = function (app) {
    var PATH_ADMIN = "/".concat(congfix_1.systemConfig.prefixAdmin);
    app.use("".concat(PATH_ADMIN, "/dashboard"), dashboard_router_1.dashboardrouter);
    app.use("".concat(PATH_ADMIN, "/topics"), topic_router_1.topicRouter);
    app.use("".concat(PATH_ADMIN, "/songs"), song_router_1.songRouter);
    app.use("".concat(PATH_ADMIN, "/upload"), upload_router_1.uploadRouter);
};
exports.default = adminRouter;
