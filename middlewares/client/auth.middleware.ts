import User from "../../model/user.model"
import { Request, Response } from "express"
export const requireAuth = async(req:Request, res:Response, next)=>{
    if(!req){
        res.redirect("`/user/login")
    }else{
        const user = await User.findOne({tokenUser:req.cookies.tokenUser}).select("-password")
        if(!user){
            res.redirect(`/user/login`)
        }else{
            res.locals.user=user
            next()
        }
    }
}