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
exports.deleted = exports.editPatch = exports.edit = exports.createPost = exports.changeStatus = exports.create = exports.index = void 0;
var md5_1 = __importDefault(require("md5"));
var accounts_model_1 = __importDefault(require("../../model/accounts.model"));
var roles_model_1 = __importDefault(require("../../model/roles.model"));
var congfix_1 = require("../../config/congfix");
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var find, accounts, _i, accounts_1, account_1, role;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                find = {
                    deleted: false
                };
                return [4 /*yield*/, accounts_model_1.default.find(find).select("-password -token")];
            case 1:
                accounts = _a.sent();
                _i = 0, accounts_1 = accounts;
                _a.label = 2;
            case 2:
                if (!(_i < accounts_1.length)) return [3 /*break*/, 5];
                account_1 = accounts_1[_i];
                if (!account_1.role_id) return [3 /*break*/, 4];
                return [4 /*yield*/, roles_model_1.default.findOne({
                        _id: account_1.role_id,
                        deleted: false
                    })];
            case 3:
                role = _a.sent();
                account_1["role"] = role;
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                res.render("admin/pages/accounts/index", {
                    pageTitle: "Trang quản lý tài khoản",
                    records: accounts
                });
                return [2 /*return*/];
        }
    });
}); };
exports.index = index;
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var roles;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, roles_model_1.default.find({ deleted: false })];
            case 1:
                roles = _a.sent();
                res.render("admin/pages/accounts/create", {
                    pageTitle: "Trang tạo tài khoản",
                    roles: roles
                });
                return [2 /*return*/];
        }
    });
}); };
exports.create = create;
var changeStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var status, id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                status = req.params.status;
                id = req.params.id;
                return [4 /*yield*/, accounts_model_1.default.updateOne({
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
var createPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var emailExist, records;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, accounts_model_1.default.findOne({
                    email: req.body.email,
                    deleted: false
                })];
            case 1:
                emailExist = _a.sent();
                if (!emailExist) return [3 /*break*/, 2];
                req.flash("error", "email ".concat(req.body.email, " \u0111\u00E3 t\u1ED3n t\u1EA1i"));
                res.redirect("back");
                return [3 /*break*/, 4];
            case 2:
                req.body.password = (0, md5_1.default)(req.body.password);
                records = new accounts_model_1.default(req.body);
                return [4 /*yield*/, records.save()];
            case 3:
                _a.sent();
                res.redirect("/".concat(congfix_1.systemConfig.prefixAdmin, "/accounts"));
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createPost = createPost;
var edit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var find, accounts, find1, roles, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                find = {
                    _id: req.params.id,
                    deleted: false
                };
                return [4 /*yield*/, accounts_model_1.default.findOne(find)];
            case 1:
                accounts = _a.sent();
                find1 = {
                    deleted: false
                };
                return [4 /*yield*/, roles_model_1.default.find(find1)];
            case 2:
                roles = _a.sent();
                res.render("admin/pages/accounts/edit", {
                    pageTitle: "Chỉnh sửa tài khoản",
                    data: accounts,
                    roles: roles
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                req.flash("error", "kh\u00F4ng c\u00F3 t\u00E0i kho\u1EA3n");
                res.redirect("/".concat(congfix_1.systemConfig.prefixAdmin, "/accounts"));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.edit = edit;
var editPatch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, emailExist, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, accounts_model_1.default.findOne({
                        _id: { $ne: id },
                        email: req.body.email,
                        deleted: false
                    })];
            case 1:
                emailExist = _a.sent();
                if (!emailExist) return [3 /*break*/, 2];
                req.flash("error", "email ".concat(req.body.email, " \u0111\u00E3 t\u1ED3n t\u1EA1i"));
                res.redirect("back");
                return [3 /*break*/, 6];
            case 2:
                if (!req.body.avatar) {
                    req.body.avatar = "";
                }
                if (req.body.password) {
                    req.body.password = (0, md5_1.default)(req.body.password);
                }
                else {
                    delete req.body.password;
                }
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, accounts_model_1.default.updateOne({
                        _id: id,
                    }, req.body)];
            case 4:
                _a.sent();
                req.flash("success", "c\u1EADp nh\u1EADt s\u1EA3n ph\u1EA9m th\u00E0nh c\u00F4ng");
                res.redirect("back");
                return [3 /*break*/, 6];
            case 5:
                error_2 = _a.sent();
                req.flash("error", "c\u1EADp nh\u1EADt s\u1EA3n ph\u1EA9m th\u1EA5t b\u1EA1i");
                res.redirect("back");
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.editPatch = editPatch;
var deleted = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, accounts_model_1.default.updateOne({
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
