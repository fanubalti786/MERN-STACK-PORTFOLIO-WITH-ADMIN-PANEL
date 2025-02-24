import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

// (() => {
// mongoose.connect(process.env.MONGO_URL)
// .then(() => {
//     console.log("Database Connected");
// })
// .catch((err) => {
//     console.log(`some error occured while connection To Database: ${err}`);
// })
// })()


// (async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("✅ Database Connected Successfully!");
//     } catch (err) {
//         console.error("❌ Error Connecting to Database:", err.message);
//     }
// })();
console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL).then(() => console.log("Database Connected")).catch((err) => console.log(`some error occured while connection To Database: ${err}`));   