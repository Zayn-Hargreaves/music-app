import { Request, Response } from "express";
import User from "../../model/user.model";
export const register = async(req:Request, res:Response, next) =>{
    if(!req.body.email || !req.body.password){
        req.flash("error", `vui lòng nhập tài khoăn hoặc mật khẩu `)
        res.redirect("back")
        return
    }
    const existEmail = await User.findOne({email:req.body.email})
    if(existEmail){
        req.flash("error", `email đã được dùng`)
        res.redirect("back")
        return
    }
    next()
}

export const forgotPasswordPost = async(req:Request, res:Response, next)=>{
    if(!req.body.email){
        req.flash("error", `vui lòng nhập email `)
        res.redirect("back")
        return
    }
    next()
}
export const resetPasswordPost = async(req:Request, res:Response, next)=>{
    if(!req.body.password){
        req.flash("error", `vui lòng nhập mật khẩu `)
        res.redirect("back")
        return
    }
    if(!req.body.confirmPassword){
        req.flash("error", `vui lòng nhập mật khẩu `)
        res.redirect("back")
        return
    }
    if(req.body.password !== req.body.confirmPassword){
        req.flash("error", `vui lòng nhập mật khẩu `)
        res.redirect("back")
        return
    }
    next()
}