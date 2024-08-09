"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = exports.favorite = exports.like = exports.detail = exports.song = void 0;
var topic_model_1 = __importDefault(require("../../model/topic.model"));
var song_model_1 = __importDefault(require("../../model/song.model"));
var singer_model_1 = __importDefault(require("../../model/singer.model"));
var user_model_1 = __importDefault(require("../../model/user.model"));
var song = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var topic, songs, _i, songs_1, song_1, infoSinger;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, topic_model_1.default.findOne({
                    deleted: false,
                    slug: req.params.slugTopics
                })];
            case 1:
                topic = _a.sent();
                return [4 /*yield*/, song_model_1.default.find({
                        deleted: false,
                        status: "active"
                    }).select("title avatar singerId like createdAt slug")];
            case 2:
                songs = _a.sent();
                _i = 0, songs_1 = songs;
                _a.label = 3;
            case 3:
                if (!(_i < songs_1.length)) return [3 /*break*/, 6];
                song_1 = songs_1[_i];
                return [4 /*yield*/, singer_model_1.default.findOne({
                        deleted: false,
                        _id: song_1.singerId
                    }).select("fullName")];
            case 4:
                infoSinger = _a.sent();
                song_1["singer"] = infoSinger;
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6:
                res.render("client/pages/song/list", {
                    pageTitle: topic.title,
                    topic: topic,
                    songs: songs
                });
                return [2 /*return*/];
        }
    });
}); };
exports.song = song;
var detail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, slugSong, song, singer, topic, tmp, regex, lrc;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = res.locals.user;
                slugSong = req.params.slugSong;
                return [4 /*yield*/, song_model_1.default.findOne({
                        slug: slugSong,
                        deleted: false,
                        status: "active"
                    })];
            case 1:
                song = _a.sent();
                return [4 /*yield*/, singer_model_1.default.findOne({
                        _id: song.singerId,
                        status: "active",
                        deleted: false
                    }).select("fullName")];
            case 2:
                singer = _a.sent();
                return [4 /*yield*/, topic_model_1.default.findOne({
                        _id: song.topicId,
                        status: "active",
                        deleted: false
                    })];
            case 3:
                topic = _a.sent();
                tmp = song.lyrics;
                regex = /\[\d{2}:\d{2}:\d{2}\]/g;
                lrc = tmp.replace(regex, "");
                song["lrc"] = lrc;
                if (user) {
                    song["favorite"] = user.favoriterSong ? true : false;
                }
                res.render("client/pages/song/detail", {
                    pageTitle: song.title,
                    song: song,
                    topic: topic,
                    singer: singer
                });
                return [2 /*return*/];
        }
    });
}); };
exports.detail = detail;
var like = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idSong, typeLike, song, newLike;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idSong = req.params.idSongs;
                typeLike = req.params.typeLike;
                return [4 /*yield*/, song_model_1.default.findOne({
                        deleted: false,
                        status: "active",
                        _id: idSong
                    })];
            case 1:
                song = _a.sent();
                newLike = typeLike == "like" ? song.like + 1 : song.like - 1;
                return [4 /*yield*/, song_model_1.default.updateOne({
                        _id: idSong
                    }, {
                        like: newLike
                    })];
            case 2:
                _a.sent();
                res.json({
                    code: 200,
                    message: "Thành công",
                    like: newLike
                });
                return [2 /*return*/];
        }
    });
}); };
exports.like = like;
var favorite = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idSong, typeFavorite, user, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                idSong = req.params.idSongs;
                typeFavorite = req.params.typeFavorite;
                return [4 /*yield*/, user_model_1.default.findOne({
                        deleted: false,
                        tokenUser: req.cookies.tokenUser
                    })];
            case 1:
                user = _b.sent();
                _a = typeFavorite;
                switch (_a) {
                    case "favorite": return [3 /*break*/, 2];
                    case "unfavorite": return [3 /*break*/, 5];
                }
                return [3 /*break*/, 7];
            case 2:
                if (!!user.favoriteSong.some(function (song) { return song.song_id === idSong; })) return [3 /*break*/, 4];
                user.favoriteSong.push({ song_id: idSong });
                return [4 /*yield*/, user.save()];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4: return [3 /*break*/, 8];
            case 5: return [4 /*yield*/, user_model_1.default.updateOne({
                    tokenUser: req.cookies.tokenUser,
                }, {
                    $pull: { favoriteSong: { song_id: idSong } }
                })];
            case 6:
                _b.sent();
                return [3 /*break*/, 8];
            case 7: return [3 /*break*/, 8];
            case 8:
                res.json({
                    code: 200,
                    message: typeFavorite == "favorite" ? "Đã thêm vào yêu thích" : "Đã xóa yêu thích",
                });
                return [2 /*return*/];
        }
    });
}); };
exports.favorite = favorite;
var listen = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idSong, song, listen, songNew;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idSong = req.params.idSongs;
                return [4 /*yield*/, song_model_1.default.findOne({
                        _id: idSong,
                    })];
            case 1:
                song = _a.sent();
                listen = song.listen + 1;
                return [4 /*yield*/, song_model_1.default.updateOne({
                        _id: idSong
                    }, {
                        listen: listen
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, song_model_1.default.findOne({
                        _id: idSong
                    })];
            case 3:
                songNew = _a.sent();
                res.json({
                    code: 200,
                    message: "Thành công",
                    listen: song.listen
                });
                return [2 /*return*/];
        }
    });
}); };
exports.listen = listen;
