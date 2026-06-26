import express from "express"
import dotenv from "dotenv";
import { db } from "./config/firebase.js";

async function testFirebase() {
    const collections = await db.listCollections();
    console.log("✅ Firebase Connected");
    console.log(collections);
}

testFirebase();
dotenv.config();
const app=express()

app.use(express.json())

const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`server runing at ${PORT}`)
});