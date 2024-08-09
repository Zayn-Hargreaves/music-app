"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var userSchema = new mongoose_1.default.Schema({
    fullName: String,
    email: String,
    password: String,
    tokenUser: String,
    phone: String,
    avatar: String,
    status: {
        type: String,
        default: "active"
    },
    favoriteSong: [
        { song_id: String }
    ],
    slug: String,
    deleted: {
        type: Boolean,
        default: false,
    },
    likeSong: [{
            song_id: String
        }],
    deletedAt: Date,
}, {
    timestamps: true,
});
var User = mongoose_1.default.model("User", userSchema, "users");
exports.default = User;
