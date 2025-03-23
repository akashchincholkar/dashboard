import mongoose from 'mongoose';
const MONGO_URL = process.env.MONGO_URL as string;

export const mongoconnect = async () => {
     if(!MONGO_URL){
         throw new Error("No MongoDB URL found in environment variables.");
     }
        console.log("ℹ️ Attempting to connect to MongoDB...");
        return mongoose.connect(MONGO_URL)
        .then(()=>{
            console.log("Successfully connected to MongoDB!");
        })

}