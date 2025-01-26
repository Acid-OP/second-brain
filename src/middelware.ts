import { NextFunction, Request , Response } from "express";
import  jwt, { JwtPayload }  from "jsonwebtoken";
import { JWT_SECRET } from "./config";

export const userMiddleware = async (req: Request , res:Response , next:NextFunction) => {

    const header = req.headers.authorization;
    const decoded = jwt.verify(header as string  , JWT_SECRET);

    if(decoded){
        
        req.userId = (decoded as JwtPayload).id;
        next();
    } else{
        res.status(401).json({message:" Unauthrized user"});
    }
}