import express from "express";
import { JWT_SECRET} from "./config";
import  Jwt from "jsonwebtoken";
import { UserModel, ContentModel, LinkModel } from "./db";
import { userMiddleware } from "./middelware";
import { random } from "./utils";
import cors from "cors";
const app  = express();
app.use(express.json());
app.use(cors());


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
    const type = req.body.type;
    await ContentModel.create({
        link ,
        type,
        title: req.body.title,
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

app.delete("/api/v1/content", userMiddleware, (req, res) => {
    const { id } = req.body;
    const userId = req.userId;

    ContentModel.findOne({ _id: id, userId })
        .then((content) => {
            if (!content) {
                return res.status(404).json({ error: "Content not found or you don’t have permission." });
            }
            
            ContentModel.findByIdAndDelete(id)
                .then(() => {
                    res.status(200).json({ message: "Content deleted successfully." });
                })
                .catch((e) => {
                    console.error("Error deleting content:", e);
                    res.status(500).json({ error: "Internal server error." });
                });
        })
        .catch((e) => {
            console.error("Error finding content:", e);
            res.status(500).json({ error: "Internal server error." });
        });
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
        _id: link.userId
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