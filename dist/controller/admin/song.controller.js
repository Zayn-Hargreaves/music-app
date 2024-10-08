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
exports.deleted = exports.detail = exports.editPatch = exports.edit = exports.createPost = exports.create = exports.changeStatus = exports.index = void 0;
var song_model_1 = __importDefault(require("../../model/song.model"));
var topic_model_1 = __importDefault(require("../../model/topic.model"));
var singer_model_1 = __importDefault(require("../../model/singer.model"));
var congfix_1 = require("../../config/congfix");
var createTreeHelper = __importStar(require("../../helper/createTree"));
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var songs, _i, songs_1, song, infoSinger, infoTopic;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, song_model_1.default.find({
                    deleted: false
                })];
            case 1:
                songs = _a.sent();
                _i = 0, songs_1 = songs;
                _a.label = 2;
            case 2:
                if (!(_i < songs_1.length)) return [3 /*break*/, 6];
                song = songs_1[_i];
                return [4 /*yield*/, singer_model_1.default.findOne({
                        deleted: false,
                        _id: song.singerId
                    }).select("fullName")];
            case 3:
                infoSinger = _a.sent();
                return [4 /*yield*/, topic_model_1.default.findOne({
                        deleted: false,
                        _id: song.topicId
                    })];
            case 4:
                infoTopic = _a.sent();
                song["singer"] = infoSinger;
                song["topic"] = infoTopic;
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 2];
            case 6:
                res.render("admin/pages/song/index", {
                    pageTitle: "Quản lý bài hát",
                    songs: songs
                });
                return [2 /*return*/];
        }
    });
}); };
exports.index = index;
var changeStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var status, id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                status = req.params.status;
                id = req.params.id;
                return [4 /*yield*/, song_model_1.default.updateOne({
                        _id: id,
                    }, {
                        status: status,
                    })];
            case 1:
                _a.sent();
                req.flash("success", "cập nhật trạng thái sản phẩm thành công");
                res.redirect("back");
                return [2 /*return*/];
        }
    });
}); };
exports.changeStatus = changeStatus;
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var records, topics, singers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, topic_model_1.default.find({
                    deleted: false
                })];
            case 1:
                records = _a.sent();
                topics = createTreeHelper.tree(records);
                return [4 /*yield*/, singer_model_1.default.find({
                        deleted: false
                    }).select("fullName")];
            case 2:
                singers = _a.sent();
                res.render("admin/pages/song/create", {
                    pageTitle: "Trang tạo bài hát",
                    topics: topics,
                    singers: singers
                });
                return [2 /*return*/];
        }
    });
}); };
exports.create = create;
var createPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var avatar, audio, object, song;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                avatar = "";
                audio = '';
                if (req.body.avatar) {
                    avatar = req.body.avatar;
                }
                if (req.body.audio) {
                    avatar = req.body.audio;
                }
                object = {
                    title: req.body.title,
                    topicId: req.body.topicId,
                    singerId: req.body.singerId,
                    description: req.body.description,
                    status: req.body.status,
                    avatar: avatar,
                    lyrics: req.body.lyrics,
                    audio: audio
                };
                song = new song_model_1.default(object);
                return [4 /*yield*/, song.save()];
            case 1:
                _a.sent();
                res.redirect("/".concat(congfix_1.systemConfig.prefixAdmin, "/songs"));
                return [2 /*return*/];
        }
    });
}); };
exports.createPost = createPost;
var edit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, song, records, topics, singers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, song_model_1.default.findOne({
                        _id: id,
                        deleted: false
                    })];
            case 1:
                song = _a.sent();
                return [4 /*yield*/, topic_model_1.default.find({
                        deleted: false
                    })];
            case 2:
                records = _a.sent();
                topics = createTreeHelper.tree(records);
                return [4 /*yield*/, singer_model_1.default.find({
                        deleted: false
                    }).select("fullName")];
            case 3:
                singers = _a.sent();
                res.render("admin/pages/song/edit", {
                    pageTitle: "Chỉnh sửa bài hát",
                    song: song,
                    topics: topics,
                    singers: singers
                });
                return [2 /*return*/];
        }
    });
}); };
exports.edit = edit;
var editPatch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var object;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                object = {
                    title: req.body.title,
                    topicId: req.body.topicId,
                    singerId: req.body.singerId,
                    description: req.body.description,
                    status: req.body.status,
                    lyrics: req.body.lyrics,
                };
                if (req.body.avatar) {
                    object["avatar"] = req.body.avatar;
                }
                if (req.body.audio) {
                    object['audio'] = req.body.audio;
                }
                return [4 /*yield*/, song_model_1.default.updateOne({
                        _id: req.params.id
                    }, object)];
            case 1:
                _a.sent();
                res.redirect("back");
                return [2 /*return*/];
        }
    });
}); };
exports.editPatch = editPatch;
var detail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, song, topics, singers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.songId;
                return [4 /*yield*/, song_model_1.default.findOne({
                        _id: id,
                        deleted: false
                    })];
            case 1:
                song = _a.sent();
                return [4 /*yield*/, topic_model_1.default.findOne({
                        _id: song.topicId,
                        deleted: false
                    }).select("title")];
            case 2:
                topics = _a.sent();
                return [4 /*yield*/, singer_model_1.default.findOne({
                        _id: song.singerId,
                        deleted: false
                    }).select("fullName")];
            case 3:
                singers = _a.sent();
                res.render("admin/pages/song/detail", {
                    pageTitle: "Trang chi tiết bài hát",
                    song: song,
                    topics: topics,
                    singers: singers
                });
                return [2 /*return*/];
        }
    });
}); };
exports.detail = detail;
var deleted = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, song_model_1.default.updateOne({
                        _id: id
                    }, {
                        deleted: true
                    })];
            case 1:
                _a.sent();
                res.redirect("back");
                return [2 /*return*/];
        }
    });
}); };
exports.deleted = deleted;
