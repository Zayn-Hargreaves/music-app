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
var topic_model_1 = __importDefault(require("../../model/topic.model"));
var congfix_1 = require("../../config/congfix");
var createTreeHelper = __importStar(require("../../helper/createTree"));
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var topic;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, topic_model_1.default.find({
                    deleted: false
                })];
            case 1:
                topic = _a.sent();
                res.render("admin/pages/topic/index", {
                    pageTitle: "Quản lý chủ đề bài hát",
                    topics: topic
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
                return [4 /*yield*/, topic_model_1.default.updateOne({
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
    var records, parentTopics;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, topic_model_1.default.find({
                    deleted: false
                })];
            case 1:
                records = _a.sent();
                parentTopics = createTreeHelper.tree(records);
                res.render("admin/pages/topic/create", {
                    pageTitle: "Trang tạo chủ đề bài hát",
                    parentTopics: parentTopics,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.create = create;
var createPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var avatar, object, topic;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                avatar = "";
                if (req.body.avatar) {
                    avatar = req.body.avatar;
                }
                object = {
                    title: req.body.title,
                    topicId: req.body.topicId,
                    parent_id: req.body.parentId,
                    description: req.body.description,
                    status: req.body.status,
                    avatar: avatar,
                };
                topic = new topic_model_1.default(object);
                return [4 /*yield*/, topic.save()];
            case 1:
                _a.sent();
                res.redirect("/".concat(congfix_1.systemConfig.prefixAdmin, "/topics"));
                return [2 /*return*/];
        }
    });
}); };
exports.createPost = createPost;
var edit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, topic, records, parentTopics;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, topic_model_1.default.findOne({
                        _id: id,
                        deleted: false
                    })];
            case 1:
                topic = _a.sent();
                return [4 /*yield*/, topic_model_1.default.find({
                        deleted: false
                    })];
            case 2:
                records = _a.sent();
                parentTopics = createTreeHelper.tree(records);
                res.render("admin/pages/topic/edit", {
                    pageTitle: "Chỉnh sửa chủ đề ",
                    topic: topic,
                    parentTopics: parentTopics
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
                    parent_id: req.body.topicId,
                    description: req.body.description,
                    status: req.body.status,
                };
                if (req.body.avatar) {
                    object["avatar"] = req.body.avatar[0];
                }
                return [4 /*yield*/, topic_model_1.default.updateOne({
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
    var id, topic, parentInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.topicId;
                return [4 /*yield*/, topic_model_1.default.findOne({
                        _id: id,
                        deleted: false
                    })];
            case 1:
                topic = _a.sent();
                if (!topic.parent_id) return [3 /*break*/, 3];
                return [4 /*yield*/, topic_model_1.default.findOne({
                        deleted: false,
                        _id: topic.parent_id
                    })];
            case 2:
                parentInfo = _a.sent();
                topic["parentTitle"] = parentInfo;
                _a.label = 3;
            case 3:
                res.render("admin/pages/topic/detail", {
                    pageTitle: "Trang chi tiết chủ đề",
                    topic: topic,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.detail = detail;
var deleted = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, topic;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, topic_model_1.default.updateOne({
                        _id: id
                    }, {
                        deleted: true
                    })];
            case 1:
                _a.sent();
                return [4 /*yield*/, topic_model_1.default.findOne({
                        _id: id
                    })];
            case 2:
                topic = _a.sent();
                res.redirect('back');
                return [2 /*return*/];
        }
    });
}); };
exports.deleted = deleted;
