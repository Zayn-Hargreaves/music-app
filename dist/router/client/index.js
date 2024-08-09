"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var topic_routes_1 = require("./topic.routes");
var song_router_1 = require("./song.router");
var favoriteSong_router_1 = require("./favoriteSong.router");
var search_router_1 = require("./search.router");
var clientRoutes = function (app) {
    app.use("/topics", topic_routes_1.topicRoutes);
    app.use("/songs", song_router_1.songRoutes);
    app.use("/favorite-song", favoriteSong_router_1.FavoriteSongRoutes);
    app.use("/search", search_router_1.searchRoutes);
};
exports.default = clientRoutes;
