import mongoose ,{ model,Schema } from "mongoose";
mongoose.connect("mongodb+srv://Cluster0:gaurav23@cluster0.kobs3.mongodb.net/brainly", {
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

const ContentSchema = new Schema({
  title: String,
  link: String,
  tags: [{type:mongoose.Types.ObjectId , ref:"tag"}],
  userId: {type: mongoose.Types.ObjectId,ref: "User",required : true},
});
export const ContentModel = model("Content", ContentSchema);

const LinkSchema = new Schema({
  hash: String,
  userId: {type: mongoose.Types.ObjectId,ref: "User",required : true , unique:true},
});
export const LinkModel = model("Links" , LinkSchema);