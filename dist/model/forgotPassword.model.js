"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var forgotPasswordSchema = new mongoose_1.default.Schema({
    email: String,
    otp: String,
    expireAt: {
        type: Date,
        expires: 180 //Thời gian hết hạn
    }
}, {
    // khi sét timestamps là true thì sẽ tự tạo sản createAt và updateAt
    timestamps: true
});
var ForgotPassword = mongoose_1.default.model("ForgotPasswordSchema", forgotPasswordSchema, "forgot-password"); // cái tham số thứ 3 là tên connection product
exports.default = ForgotPassword;
// tk MongoDB
// username: lenhathuy9a6
// Password: zPL4peRvD3BIrhis
