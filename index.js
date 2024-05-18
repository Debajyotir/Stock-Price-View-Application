import express  from "express";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv";
import convert from "./AddToDB/convert.js";
import findRouter from "./Router/find.js"
import favRouter from "./Router/favourite.js"

const app = express();
dotenv.config();

app.use(express.json());

app.use(cors());

app.use("/find",findRouter);

app.use("/favourite",favRouter);


mongoose.connect(process.env.MONGO_URL,{
    dbName: "Stockbse",
}).then((c)=>console.log(`Database Connected with ${c.connection.host}`)).catch((e)=>console.log(e));

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})