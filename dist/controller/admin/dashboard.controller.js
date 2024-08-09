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
exports.index = void 0;
var topic_model_1 = __importDefault(require("../../model/topic.model"));
var song_model_1 = __importDefault(require("../../model/song.model"));
var accounts_model_1 = __importDefault(require("../../model/accounts.model"));
var user_model_1 = __importDefault(require("../../model/user.model"));
var singer_model_1 = __importDefault(require("../../model/singer.model"));
// [GET] /admin/dashboard 
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var staticc, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    return __generator(this, function (_r) {
        switch (_r.label) {
            case 0:
                staticc = {
                    topic: {
                        total: 0,
                        active: 0,
                        inactive: 0,
                    },
                    song: {
                        total: 0,
                        active: 0,
                        inactive: 0,
                    },
                    singer: {
                        total: 0,
                        active: 0,
                        inactive: 0,
                    },
                    account: {
                        total: 0,
                        active: 0,
                        inactive: 0,
                    },
                    user: {
                        total: 0,
                        active: 0,
                        inactive: 0,
                    }
                };
                _a = staticc.topic;
                return [4 /*yield*/, topic_model_1.default.countDocuments({
                        deleted: false,
                    })];
            case 1:
                _a.total = _r.sent();
                _b = staticc.topic;
                return [4 /*yield*/, topic_model_1.default.countDocuments({
                        deleted: false,
                        status: "active"
                    })];
            case 2:
                _b.active = _r.sent();
                _c = staticc.topic;
                return [4 /*yield*/, topic_model_1.default.countDocuments({
                        deleted: false,
                        status: "inactive"
                    })];
            case 3:
                _c.inactive = _r.sent();
                _d = staticc.song;
                return [4 /*yield*/, song_model_1.default.countDocuments({
                        deleted: false,
                    })];
            case 4:
                _d.total = _r.sent();
                _e = staticc.song;
                return [4 /*yield*/, song_model_1.default.countDocuments({
                        deleted: false,
                        status: "active"
                    })];
            case 5:
                _e.active = _r.sent();
                _f = staticc.song;
                return [4 /*yield*/, song_model_1.default.countDocuments({
                        deleted: false,
                        status: "inactive"
                    })];
            case 6:
                _f.inactive = _r.sent();
                _g = staticc.account;
                return [4 /*yield*/, accounts_model_1.default.countDocuments({
                        deleted: false,
                    })];
            case 7:
                _g.total = _r.sent();
                _h = staticc.account;
                return [4 /*yield*/, accounts_model_1.default.countDocuments({
                        deleted: false,
                        status: "active"
                    })];
            case 8:
                _h.active = _r.sent();
                _j = staticc.account;
                return [4 /*yield*/, accounts_model_1.default.countDocuments({
                        deleted: false,
                        status: "inactive"
                    })];
            case 9:
                _j.inactive = _r.sent();
                _k = staticc.user;
                return [4 /*yield*/, user_model_1.default.countDocuments({
                        deleted: false,
                    })];
            case 10:
                _k.total = _r.sent();
                _l = staticc.user;
                return [4 /*yield*/, user_model_1.default.countDocuments({
                        deleted: false,
                        status: "active"
                    })];
            case 11:
                _l.active = _r.sent();
                _m = staticc.user;
                return [4 /*yield*/, user_model_1.default.countDocuments({
                        deleted: false,
                        status: "inactive"
                    })];
            case 12:
                _m.inactive = _r.sent();
                _o = staticc.singer;
                return [4 /*yield*/, singer_model_1.default.countDocuments({
                        deleted: false,
                    })];
            case 13:
                _o.total = _r.sent();
                _p = staticc.singer;
                return [4 /*yield*/, singer_model_1.default.countDocuments({
                        deleted: false,
                        status: "active"
                    })];
            case 14:
                _p.active = _r.sent();
                _q = staticc.singer;
                return [4 /*yield*/, singer_model_1.default.countDocuments({
                        deleted: false,
                        status: "inactive"
                    })];
            case 15:
                _q.inactive = _r.sent();
                res.render("admin/pages/dashboard/index", {
                    pageTitle: "Trang tổng quan",
                    statistic: staticc
                });
                return [2 /*return*/];
        }
    });
}); };
exports.index = index;
