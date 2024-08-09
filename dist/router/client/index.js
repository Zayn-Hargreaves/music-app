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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var topic_routes_1 = require("./topic.routes");
var song_router_1 = require("./song.router");
var search_router_1 = require("./search.router");
var home_router_1 = require("./home.router");
var user_router_1 = require("./user.router");
var infoUserMiddleware = __importStar(require("../../middlewares/client/infoUser.middleware"));
var favorite_song_router_1 = require("./favorite-song.router");
var setting_middleware_1 = __importDefault(require("../../middlewares/client/setting.middleware"));
var clientRoutes = function (app) {
    app.use(infoUserMiddleware.infoUser);
    app.use(setting_middleware_1.default);
    app.use("/", home_router_1.homeRoutes);
    app.use("/topics", topic_routes_1.topicRoutes);
    app.use("/songs", song_router_1.songRoutes);
    app.use("/search", search_router_1.searchRoutes);
    app.use("/user", user_router_1.userRoutes);
    app.use("/favorite-song", favorite_song_router_1.favoriteSongRoutes);
};
exports.default = clientRoutes;
