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
exports.permissionsPatch = exports.permissions = exports.deleteItem = exports.editPatch = exports.edit = exports.createPost = exports.create = exports.index = void 0;
var roles_model_1 = __importDefault(require("../../model/roles.model"));
var congfix_1 = require("../../config/congfix");
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var records;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, roles_model_1.default.find({
                    deleted: false
                })];
            case 1:
                records = _a.sent();
                res.render("admin/pages/roles/index", {
                    pageTitle: "Trang phân quyền",
                    records: records
                });
                return [2 /*return*/];
        }
    });
}); };
exports.index = index;
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var find, records;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                find = {
                    deleted: false
                };
                return [4 /*yield*/, roles_model_1.default.find(find)];
            case 1:
                records = _a.sent();
                res.render("admin/pages/roles/create", {
                    pageTitle: "Trang tạo nhóm quyền ",
                    records: records
                });
                return [2 /*return*/];
        }
    });
}); };
exports.create = create;
var createPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var records;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                records = new roles_model_1.default(req.body);
                return [4 /*yield*/, records.save()];
            case 1:
                _a.sent();
                res.redirect("/".concat(congfix_1.systemConfig.prefixAdmin, "/roles"));
                return [2 /*return*/];
        }
    });
}); };
exports.createPost = createPost;
var edit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, find, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                find = {
                    _id: id,
                    deleted: false
                };
                return [4 /*yield*/, roles_model_1.default.findOne(find)];
            case 1:
                data = _a.sent();
                res.render("admin/pages/roles/edit", {
                    pageTitle: "sua nhom quyen",
                    data: data
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.redirect("/".concat(congfix_1.systemConfig.prefixAdmin, "/roles"));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.edit = edit;
var editPatch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, roles_model_1.default.updateOne({ _id: id }, req.body)];
            case 1:
                _a.sent();
                req.flash("success", "cap nhat thanh cong");
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                req.flash("error", "cap nhat that bai");
                res.redirect("back");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.editPatch = editPatch;
//[delete] /admin/roles/delete/:id
var deleteItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, roles_model_1.default.updateOne({ _id: id }, { deleted: true, deleteAt: new Date() })];
            case 1:
                _a.sent();
                req.flash("success", "\u0111\u00E3 xo\u00E1 th\u00E0nh c\u00F4ng");
                res.redirect("back");
                return [2 /*return*/];
        }
    });
}); };
exports.deleteItem = deleteItem;
var permissions = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var find, records;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                find = {
                    deleted: false
                };
                return [4 /*yield*/, roles_model_1.default.find(find)];
            case 1:
                records = _a.sent();
                res.render("admin/pages/roles/permissions", {
                    pageTitle: "Trang phân quyền",
                    records: records
                });
                return [2 /*return*/];
        }
    });
}); };
exports.permissions = permissions;
var permissionsPatch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var permissions_2, _i, permissions_1, item, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                permissions_2 = JSON.parse(req.body.permissions);
                _i = 0, permissions_1 = permissions_2;
                _a.label = 1;
            case 1:
                if (!(_i < permissions_1.length)) return [3 /*break*/, 4];
                item = permissions_1[_i];
                return [4 /*yield*/, roles_model_1.default.updateOne({ _id: item.id }, { permissions: item.permissions })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                req.flash("success", "cap nhat thanh cong");
                res.redirect('back');
                return [3 /*break*/, 6];
            case 5:
                error_3 = _a.sent();
                req.flash("error", "cap nhat that bai");
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.permissionsPatch = permissionsPatch;
