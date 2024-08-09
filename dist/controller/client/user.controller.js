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
exports.editPatch = exports.edit = exports.resetPasswordPost = exports.resetPassword = exports.otpPasswordPost = exports.otpPassword = exports.forgotPasswordPost = exports.forgotPassword = exports.info = exports.logout = exports.loginPost = exports.login = exports.registerPost = exports.register = void 0;
var md5_1 = __importDefault(require("md5"));
var user_model_1 = __importDefault(require("../../model/user.model"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var forgotPassword_model_1 = __importDefault(require("../../model/forgotPassword.model"));
var sendMailHelper = __importStar(require("../../helper/sendMail.helper"));
var generateToken = function (user) {
    if (!process.env.JWT_SECRET_KEY) {
        throw new Error("JWT_SECRET_KEY is not defined");
    }
    return jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "356d",
    });
};
var generateRandomNumber = function (length) {
    var charaters = "0123456789";
    var result = "";
    for (var i = 0; i < length; i++) {
        result += charaters.charAt(Math.floor(Math.random() * charaters.length));
    }
    return result;
};
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.render("client/pages/user/register", {
            pageTitle: "Trang đăng ký",
        });
        return [2 /*return*/];
    });
}); };
exports.register = register;
var registerPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                req.body.password = (0, md5_1.default)(req.body.password);
                user = new user_model_1.default(req.body);
                return [4 /*yield*/, user.save()];
            case 1:
                _a.sent();
                req.flash("success", "Đăng ký thành công");
                res.redirect("/");
                return [2 /*return*/];
        }
    });
}); };
exports.registerPost = registerPost;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.render("client/pages/user/login", {
            pageTitle: "Trang đăng nhập",
        });
        return [2 /*return*/];
    });
}); };
exports.login = login;
var loginPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, existUser, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                password = req.body.password;
                return [4 /*yield*/, user_model_1.default.findOne({
                        email: email,
                        deleted: false
                    })];
            case 1:
                existUser = _a.sent();
                if (!existUser) {
                    req.flash("error", "Tài khoản không tồn tại");
                    return [2 /*return*/];
                }
                if ((0, md5_1.default)(password) !== existUser.password) {
                    req.flash("error", "Sai mật khẩu");
                    return [2 /*return*/];
                }
                if (existUser.status === "inactive") {
                    req.flash("error", "Chưa kích hoạt tài khoản");
                    return [2 /*return*/];
                }
                token = generateToken(existUser);
                existUser.tokenUser = token;
                res.cookie("tokenUser", token);
                existUser.save();
                res.redirect("/");
                return [2 /*return*/];
        }
    });
}); };
exports.loginPost = loginPost;
var logout = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.clearCookie("tokenUser");
        res.clearCookie("favoriteSongId");
        res.redirect("/");
        return [2 /*return*/];
    });
}); };
exports.logout = logout;
var info = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_model_1.default.findOne({
                    deleted: false,
                    tokenUser: req.cookies.tokenUser
                }).select("-password")];
            case 1:
                user = _a.sent();
                res.render("client/pages/user/info", {
                    pageTitle: "Trang thông tin người dùng",
                    user: user
                });
                return [2 /*return*/];
        }
    });
}); };
exports.info = info;
var forgotPassword = function (req, res) {
    res.render("client/pages/user/forgot-password", {
        pageTitle: "Quên mật khẩu"
    });
};
exports.forgotPassword = forgotPassword;
var forgotPasswordPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, objectForgotPassword, forgotPassword;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                return [4 /*yield*/, user_model_1.default.findOne({
                        email: email,
                        deleted: "false"
                    })];
            case 1:
                user = _a.sent();
                if (!user) {
                    req.flash("error", "Email không tồn tại");
                    res.redirect("back");
                    return [2 /*return*/];
                }
                objectForgotPassword = {
                    email: email,
                    otp: generateRandomNumber(8),
                    expiresAt: Date.now()
                };
                forgotPassword = new forgotPassword_model_1.default(objectForgotPassword);
                return [4 /*yield*/, forgotPassword.save()];
            case 2:
                _a.sent();
                sendMailHelper.sendMail(email, "Mã otp xác minh lấy lại mật khẩu", "M\u00E3 otp x\u00E1c minh l\u1EA5y l\u1EA1i m\u1EADt kh\u1EA9u l\u00E0 <b>".concat(objectForgotPassword.otp, "</b>. Th\u1EDDi h\u1EA1n s\u1EED d\u1EE5ng l\u00E0 5 ph\u00FAt"));
                res.redirect("/user/password/otp?email=".concat(email));
                return [2 /*return*/];
        }
    });
}); };
exports.forgotPasswordPost = forgotPasswordPost;
var otpPassword = function (req, res) {
    var email = req.query.email;
    res.render("client/pages/user/otp-password", {
        pageTitle: "Trang nhập mã otp",
        email: email
    });
};
exports.otpPassword = otpPassword;
var otpPasswordPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, otp, result, user, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                otp = req.body.otp;
                return [4 /*yield*/, forgotPassword_model_1.default.findOne({
                        email: email,
                        otp: otp
                    })];
            case 1:
                result = _a.sent();
                if (!result) {
                    req.flash("error", "otp không hợp lệ");
                    res.redirect("back");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, user_model_1.default.findOne({
                        email: email
                    })];
            case 2:
                user = _a.sent();
                token = generateToken(user);
                user.tokenUser = token;
                res.cookie("tokenUser", token);
                user.save();
                res.redirect("/user/password/reset-password");
                return [2 /*return*/];
        }
    });
}); };
exports.otpPasswordPost = otpPasswordPost;
var resetPassword = function (req, res) {
    res.render("client/pages/user/reset-password", {
        pageTitle: "Trang reset mật khẩu"
    });
};
exports.resetPassword = resetPassword;
var resetPasswordPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var password, tokenUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                password = req.body.password;
                tokenUser = req.cookies.tokenUser;
                return [4 /*yield*/, user_model_1.default.updateOne({
                        tokenUser: tokenUser
                    }, {
                        password: (0, md5_1.default)(password)
                    })];
            case 1:
                _a.sent();
                res.redirect("/");
                return [2 /*return*/];
        }
    });
}); };
exports.resetPasswordPost = resetPasswordPost;
var edit = function (req, res) {
    res.render("client/pages/user/edit", {
        pageTitle: "Trang chỉnh sửa tài khoản"
    });
};
exports.edit = edit;
var editPatch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, emailExist;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = res.locals.user.id;
                return [4 /*yield*/, user_model_1.default.findOne({
                        _id: { $ne: id },
                        email: req.body.email,
                        deleted: false
                    })];
            case 1:
                emailExist = _a.sent();
                if (!emailExist) return [3 /*break*/, 2];
                req.flash("error", "Email ".concat(req.body.email, " \u0111\u00E3 t\u1ED3n t\u1EA1i"));
                return [3 /*break*/, 4];
            case 2:
                if (req.body.password) {
                    req.body.password = (0, md5_1.default)(req.body.password);
                }
                else {
                    delete req.body.password;
                }
                return [4 /*yield*/, user_model_1.default.updateOne({ _id: id }, req.body)];
            case 3:
                _a.sent();
                req.flash("success", "Cập nhật tài khoản thành công");
                _a.label = 4;
            case 4:
                res.redirect("back");
                return [2 /*return*/];
        }
    });
}); };
exports.editPatch = editPatch;
