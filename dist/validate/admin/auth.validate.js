"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPost = void 0;
var LoginPost = function (req, res, next) {
    if (!req.body.email || !req.body.password) {
        req.flash("error", "vui l\u00F2ng nh\u1EADp ti\u00EAu \u0111\u1EC1 ");
        res.redirect("back");
        return;
    }
    next();
};
exports.LoginPost = LoginPost;
