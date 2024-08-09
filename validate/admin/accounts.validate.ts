import { Request, Response } from "express"
export const createPost = (req:Request,res:Response,next) =>{
    if(!req.body.fullName){
        req.flash("error", `vui lòng nhập tên `)
        res.redirect("back")
        return
    }
    next()
}
export const editPatch = (req:Request, res:Response, next) =>{
    if(!req.body.password){
        req.flash("error", `vui lòng nhập mật khẩu `)
        res.redirect("back")
        return
    }
    next()
}