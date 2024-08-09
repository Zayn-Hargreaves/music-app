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
exports.userRoutes = void 0;
var express_1 = require("express");
var Controller = __importStar(require("../../controller/client/user.controller"));
var Validate = __importStar(require("../../validate/client/auth.validate"));
var multer_1 = __importDefault(require("multer"));
var uploadCloud = __importStar(require("../../middlewares/admin/uploadCloud.middleware"));
var upload = (0, multer_1.default)();
var Middleware = __importStar(require("../../middlewares/client/auth.middleware"));
var router = (0, express_1.Router)();
router.get("/login", Controller.login);
router.post("/login", Controller.loginPost);
router.get("/register", Controller.register);
router.post("/register", Validate.register, Controller.registerPost);
router.get("/logout", Controller.logout);
router.get("/password/forgot", Controller.forgotPassword);
router.post("/password/forgot", Validate.forgotPasswordPost, Controller.forgotPasswordPost);
router.get("/password/otp", Controller.otpPassword);
router.post("/password/otp", Controller.otpPasswordPost);
router.get("/password/reset-password", Controller.resetPassword);
router.post("/password/reset-password", Validate.resetPasswordPost, Controller.resetPasswordPost);
router.get("/info", Middleware.requireAuth, Controller.info);
router.get("/edit", Middleware.requireAuth, Controller.edit);
router.patch("/edit", Middleware.requireAuth, upload.single("avatar"), uploadCloud.uploadSingle, Controller.editPatch);
exports.userRoutes = router;
