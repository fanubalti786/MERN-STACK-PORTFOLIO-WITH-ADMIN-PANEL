import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import "./database/db.js";
const app = express();
dotenv.config();

app.use(cors(
    {
        origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true 
    }
));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));

export default app;