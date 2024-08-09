"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editPatch = exports.createPost = void 0;
var createPost = function (req, res, next) {
    if (!req.body.fullName) {
        req.flash("error", "vui l\u00F2ng nh\u1EADp t\u00EAn ");
        res.redirect("back");
        return;
    }
    next();
};
exports.createPost = createPost;
var editPatch = function (req, res, next) {
    if (!req.body.password) {
        req.flash("error", "vui l\u00F2ng nh\u1EADp m\u1EADt kh\u1EA9u ");
        res.redirect("back");
        return;
    }
    next();
};
exports.editPatch = editPatch;
