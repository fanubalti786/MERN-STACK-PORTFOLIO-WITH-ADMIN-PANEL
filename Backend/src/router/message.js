import express from "express";
import { sendMessage } from "../controllers/message.js";
import { errorMiddleware } from "../middlewares/error.js";
import { getAllMessages } from "../controllers.js/message.js";

const router = express.Router();    

router.post("/send", sendMessage, errorMiddleware);
router.get("/get", getAllMessages, errorMiddleware);
router.delete("/delete/:id", errorMiddleware);


export const messageRouter = router;