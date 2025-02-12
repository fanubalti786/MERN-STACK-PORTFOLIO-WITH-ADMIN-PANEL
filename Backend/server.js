import app from "./app.js";

app.listen(process.env.PORT, ()=>
{
    console.log(`Server is running on ${process.env.PORT}`);
});

console.log("its a port number: ",process.env.PORT)