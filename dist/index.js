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
var dotenv_1 = __importDefault(require("dotenv"));
var database = __importStar(require("./config/database"));
var client_1 = __importDefault(require("./router/client"));
var index_router_1 = __importDefault(require("./router/admin/index.router"));
var congfix_1 = require("./config/congfix");
var path_1 = __importDefault(require("path"));
var body_parser_1 = __importDefault(require("body-parser"));
var method_override_1 = __importDefault(require("method-override"));
dotenv_1.default.config();
database.connect();
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
app.locals.prefixAdmin = congfix_1.systemConfig.prefixAdmin;
app.use((0, method_override_1.default)("_method"));
app.set("/views", "".concat(__dirname, "/views"));
app.set("view engine", "pug");
app.use("/tinymce", express_1.default.static(path_1.default.join(__dirname, "node_module", "tinymce")));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static("".concat(__dirname, "/public")));
(0, client_1.default)(app);
(0, index_router_1.default)(app);
app.listen(port, function () {
    console.log("Listen on port ".concat(port));
});
