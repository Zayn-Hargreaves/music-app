import express, { Express } from "express";
import path from "path";
import methodOverride from "method-override";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import dotenv from "dotenv";
import { systemConfig } from "./config/congfix";
import * as database from "./config/database";
import clientRoutes from "./router/client";
import adminRouter from "./router/admin/index.router";
import flash from "express-flash"

dotenv.config();
database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use("/tinymce", express.static(path.join(__dirname, "node_modules", "tinymce")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Middleware cài đặt flash messages
app.use(cookieParser("stsssrttsrt"));
app.use(session({
    secret: 'asdfasd', 
    resave: false, 
    saveUninitialized: true, 
    cookie: { maxAge: 60000 } 
}));
app.use(flash());

clientRoutes(app);
adminRouter(app);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
