import express from "express";
import { JWT_SECRET} from "./config";
import  Jwt from "jsonwebtoken";
import { UserModel, ContentModel } from "./db";
import { userMiddleware } from "./middelware";
const app  = express();
app.use(express.json());
app.post("/api/v1/signup", async (req ,res) => {

    const username = req.body.username;
    const password = req.body.password;
    try{
        await UserModel.create({
            username: username,
            password: password
        })
    
        res.json({
            message: "user signed up"
        })
    }catch (e) {
        res.status(409).json({ message: "User already exists" }); 
    }

});
    


app.post("/api/v1/signin", async (req , res) =>{

    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await UserModel.findOne({username , password});
    if(existingUser){
        const token = Jwt.sign({id:existingUser._id},JWT_SECRET);
        res.json({token});
    } else{
        res.status(403).json({message:" Incorrect credentials "});
    }

});

app.post("/api/v1/content", userMiddleware, async (req , res) =>{
    const link = req.body.link;
    const title = req.body.title;
    await ContentModel.create({
        link ,
        title,
        // @ts-ignore
        userId: req.userId,
        tags : []
    })

    res.json({
        message: "Content added"
    })

})

app.get("/api/v1/content" , userMiddleware , async (req , res) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({userId: userId}).populate("userId","username");
    res.json(content);
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;
    // @ts-ignore
    await ContentModel.deleteMany({ contentId, userId: req.userId });
    res.json({ message: "Deleted" }); 
});

app.post("/api/v1/brain/share" , (req , res) => {

})

app.get("/api/v1/brain/:ShareLink" , (req,res) => {

})
app.listen(3000);