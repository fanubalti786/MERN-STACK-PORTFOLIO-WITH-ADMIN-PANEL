import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import { messageRouter } from "./router/message.js";
import { userRouter } from "./router/user.js";
import { timeLineRouter } from "./router/timeLine.js";
import { applicationRouter } from "./router/application.js";
import { projectRouter } from "./router/project.js";
import { skillRouter } from "./router/skill.js";

import "./database/db.js";

const app = express();


app.use(cors());

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static("public"));
// app.use(fileUpload({
//     useTempFiles: true,
//     tempFileDir: path.join(__dirname, "tmp"),
// }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))



app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/timeLine", timeLineRouter);
app.use("/api/v1/application", applicationRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/skill", skillRouter);
app.use(errorMiddleware);

// server listen
app.listen(process.env.PORT, ()=>
{
    console.log(`Server is running on ${process.env.PORT}`);
});


