import express from "express";
import { sendMessage } from "../controllers/message.js";
import { errorMiddleware } from "../middlewares/error.js";
import { getAllMessages } from "../controllers/message.js";
import { deleteMessage } from "../controllers/message.js";

const router = express.Router();    

router.post("/send", sendMessage, errorMiddleware);
router.get("/getAll", getAllMessages, errorMiddleware);
router.delete("/delete/:id", deleteMessage, errorMiddleware);


export const messageRouter = router;