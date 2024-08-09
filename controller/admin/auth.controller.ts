import account from "../../model/accounts.model";
import md5 from "md5"
import { Request, Response } from "express";
import { systemConfig } from "../../config/congfix";
// [GET] /admin/dashboard 
import jwt from "jsonwebtoken"
const generateToken = (user) =>{
    return jwt.sign(
        {id:user._id, role:user.role}, 
        process.env.JWT_SECRET_KEY,{
        expiresIn:"356d",
    })
}
export const login = async(req:Request, res:Response) => {
    if(req.cookies.token){
        res.redirect(`/${systemConfig.prefixAdmin}/dashboard`)
    }else{
        res.render("admin/pages/auth/login", {
            pageTitle: "Trang tổng quan"
        })
    }
}
export const loginPost = async(req:Request, res:Response) =>{
    const email = req.body.email
    const password = req.body.password
    const user = await account.findOne({
        email:email,
        deleted:false       
    })
    if(!user){
        req.flash("error","Email không tồn tại")
        res.redirect("back")
        return
    }else{
        if (md5(password) != user.password) {
            req.flash("error", "Sai mật khẩu");
            res.redirect("back");
            return;
        }else if (user.status == "inactive") {
            req.flash("error", "Tài khoản đã bị khóa");
            res.redirect("back");
            return;
        }else{
            const token = generateToken(user);
            user.token = token
            await user.save()
            res.cookie("token", user.token);
            res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
        }
    }
}
export const logout = async (req:Request, res:Response) => {
    res.clearCookie("token");
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
}