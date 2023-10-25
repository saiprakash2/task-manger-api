//This file will handle connection logic to mongodb
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL)

        const connection = await mongoose.connection;

        connection.on('connected',()=> {
            console.log("MongoDB connected successfully");
        });

        connection.on('error', (err)=>{
            console.log("MongoDB Connection Error. Please make sure MongoDB is running", +  err)
            process.exit()
        });
    } catch (error) {
        console.log("something goes wrong");
        console.log(error);
        
    }
}

