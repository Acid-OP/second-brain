declare global {
    namespace Express {
        export interface Request{
            userId?: string;
        }}
}

import express from "express";
import { JWT_SECRET} from "./config";
import  Jwt from "jsonwebtoken";
import { UserModel, ContentModel, LinkModel } from "./db";
import { userMiddleware } from "./middelware";
import { random } from "./utils";
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
        userId: req.userId,
        tags : []
    })

    res.json({
        message: "Content added"
    })

})

app.get("/api/v1/content" , userMiddleware , async (req , res) => {
    
    const userId = req.userId;
    const content = await ContentModel.find({userId: userId}).populate("userId","username");
    res.json(content);
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;
    await ContentModel.deleteMany({ contentId, userId: req.userId });
    res.json({ message: "Deleted" }); 
});

app.post("/api/v1/brain/share" , userMiddleware , async (req , res) => {
    const share = req.body.share;
    if(share) {
        const existingLink = await LinkModel.findOne({
            userId : req.userId
        });

        if(existingLink) {
            res.json({
                hash: existingLink.hash
            })
            return;
        }
        const hash = random(10);
        await LinkModel.create({
            userId : req.userId,
            hash : hash
        })

        res.json({
            message : "/share/" + hash
        })
    } else {
        await LinkModel.deleteOne({
            userId: req.userId
        });
    }

    res.json({
        message: "Removed Link"
    })
})

app.get("/api/v1/brain/:ShareLink" , async (req,res) => {
    const hash = req.params.ShareLink;

    const link = await LinkModel.findOne({
        hash
    });
    if(!link){
        res.status(411).json({
            message: "Sorry incorrect input"
        })
        return ;
    }

    // userid
    const content = await ContentModel.find({
        userId: link.userId
    })

    const user = await UserModel.findOne({
        userId: link.userId
    })

    if(!user){
        res.status(411).json({
            message : "user not found , error show"
        })
        return;
    }
    res.json({
        username: user?.username,
        content: content
    })
    
})
app.listen(3000);