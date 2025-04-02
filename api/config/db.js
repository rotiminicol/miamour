import mongoose from "mongoose";

export const connectDB = async () => {
   try{
      const conn = await mongoose.connect(process.env.MONGO_URL, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         serverSelectionTimeoutMS: 5000 // Timeout after 5 seconds
       });
   } catch (error) {
      console.log("Error connecting to MongoDB: ", error);
      process.exit(1);
   }
};