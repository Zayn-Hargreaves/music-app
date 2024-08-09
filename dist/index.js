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
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var method_override_1 = __importDefault(require("method-override"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var express_session_1 = __importDefault(require("express-session"));
var dotenv_1 = __importDefault(require("dotenv"));
var congfix_1 = require("./config/congfix");
var database = __importStar(require("./config/database"));
var client_1 = __importDefault(require("./router/client"));
var index_router_1 = __importDefault(require("./router/admin/index.router"));
var express_flash_1 = __importDefault(require("express-flash"));
dotenv_1.default.config();
database.connect();
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
app.locals.prefixAdmin = congfix_1.systemConfig.prefixAdmin;
app.use((0, method_override_1.default)("_method"));
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "pug");
app.use("/tinymce", express_1.default.static(path_1.default.join(__dirname, "node_modules", "tinymce")));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// Middleware cài đặt flash messages
app.use((0, cookie_parser_1.default)("stsssrttsrt"));
app.use((0, express_session_1.default)({
    secret: 'asdfasd',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));
app.use((0, express_flash_1.default)());
(0, client_1.default)(app);
(0, index_router_1.default)(app);
app.listen(port, function () {
    console.log("Listening on port ".concat(port));
});
