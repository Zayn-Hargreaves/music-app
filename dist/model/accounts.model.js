"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var accountSchema = new mongoose_1.default.Schema({
    fullName: String,
    email: String,
    password: String,
    token: String,
    phone: String,
    avatar: String,
    role_id: String,
    status: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deleteAt: Date
}, {
    timestamps: true
});
var account = mongoose_1.default.model("account", accountSchema, "accounts");
exports.default = account;
