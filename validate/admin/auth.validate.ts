import { Request, Response } from "express"
export const LoginPost = (req:Request,res:Response,next) =>{
    if(!req.body.email || !req.body.password){
        req.flash("error", `vui lòng nhập tiêu đề `)
        res.redirect("back")
        return
    }
    next()
}