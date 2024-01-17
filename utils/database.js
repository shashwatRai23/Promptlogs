import mongoose from "mongoose";

let isConnected=false;

export const connectToDatabase = async () => {
    mongoose.set('strictQuery',true)
    if(isConnected){
        console.log("Already connected to MongoDB");
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
        });
        isConnected = true;
        console.log("Connected to MongoDB");
    }
    catch(e){
        console.log(e);
    }

}