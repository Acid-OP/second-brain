import mongoose ,{ model,Schema } from "mongoose";
mongoose.connect("put your url here", {
  }).then(() => {
    console.log("Connected to MongoDB");
  }).catch((error) => {
    console.error("MongoDB connection error:", error);
  });


const UserSchema = new Schema({
    username: {type:String , unique:true},
    password: String
})

export const UserModel = model( "User" , UserSchema);