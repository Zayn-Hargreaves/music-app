"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var settingGeneralSchema = new mongoose_1.default.Schema({
    websiteName: String,
    logo: String,
    phone: String,
    email: String,
    address: String,
    copyright: String
}, {
    // khi sét timestamps là true thì sẽ tự tạo sản createAt và updateAt
    timestamps: true
});
var SettingGeneral = mongoose_1.default.model("SettingGeneral", settingGeneralSchema, "settings-general"); // cái tham số thứ 3 là tên connection product
exports.default = SettingGeneral;
// tk MongoDB
// username: lenhathuy9a6
// Password: zPL4peRvD3BIrhis
