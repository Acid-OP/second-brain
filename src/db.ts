import mongoose ,{ model,Schema } from "mongoose";
<<<<<<< HEAD
mongoose.connect("process.env.MONGO_URL", {
=======
mongoose.connect("put your url here", {
>>>>>>> 6771c2c9763d07f8fbdfc31881c3099765349f6b
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
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required : true
  },

});

export const ContentModel = model("Content", ContentSchema);