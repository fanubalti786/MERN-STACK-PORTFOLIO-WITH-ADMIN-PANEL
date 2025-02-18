import app from "./app.js";
import { errorMiddleware } from "./middlewares/error.js";
import { messageRouter } from "./router/message.js";
import { userRouter } from "./router/user.js";
import { timeLineRouter } from "./router/timeLine.js";
import { applicationRouter } from "./router/application.js";


app.listen(process.env.PORT, ()=>
{
    console.log(`Server is running on ${process.env.PORT}`);
});

console.log("its a port number: ",process.env.PORT)



app.use("/api/v1/message", messageRouter);
app.use("api/v1/user", userRouter);
app.use("api/v1/timeLine", timeLineRouter);
app.use("api/v1/application", applicationRouter);
app.use(errorMiddleware);


