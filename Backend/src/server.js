import app from "./app.js";
import { messageRouter } from "./router/message.js";


app.listen(process.env.PORT, ()=>
{
    console.log(`Server is running on ${process.env.PORT}`);
});

console.log("its a port number: ",process.env.PORT)



app.use("/api/v1/message", messageRouter);