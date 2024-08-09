import { systemConfig } from "../../config/congfix"
import account from "../../model/accounts.model"
import Role from "../../model/roles.model"
import { Request,Response } from "express"
export const requireAuth = async(req:Request, res:Response,next) =>{
    if(!req.cookies.token){
        res.redirect(`/${systemConfig.prefixAdmin}/auth/login`)
    }else{
        const user = await account.findOne({token:req.cookies.token}).select("-password")
        if(!user){
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
        }else{
            const role = await Role.findOne({_id:user.role_id}).select("title permissions")
            res.locals.user=user
            res.locals.role= role
            next();
        }
    }
}