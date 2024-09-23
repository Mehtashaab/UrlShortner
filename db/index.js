import mongoose from "mongoose";

const connectDB= async ()=>{
    try {
        const connect = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
        console.log(`Connected to MongoDB: ${connect.connection.host}`);
    } catch (error) {
        
        console.error(`Error connecting to MongoDB: ${error.message}`);
    }
}

export  {connectDB}