import mongoose from "mongoose";

const dbConnection = () => {
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Database Connected");
})
.catch((err) => {
    console.log(`some error occured while connection To Database: ${err}`);
})
};

export default dbConnection;