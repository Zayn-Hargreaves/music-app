import { Request, Response } from "express"
import md5 from "md5"
import User from "../../model/user.model"
import jwt from "jsonwebtoken"
import { Document, Types } from "mongoose"
import ForgotPassword from "../../model/forgotPassword.model"
import * as sendMailHelper from "../../helper/sendMail.helper"
const generateToken = (user: Document<unknown, {}, { createdAt: NativeDate; updatedAt: NativeDate } & { status: string; deleted: boolean; likeSong: Types.DocumentArray<{ song_id?: string | null | undefined }>; fullName?: string | null | undefined; email?: string | null | undefined; password?: string | null | undefined; tokenUser?: string | null | undefined; phone?: string | null | undefined; avatar?: string | null | undefined; slug?: string | null | undefined; deletedAt?: Date | null | undefined }> & { createdAt: NativeDate; updatedAt: NativeDate } & { status: string; deleted: boolean; likeSong: Types.DocumentArray<{ song_id?: string | null | undefined }>; fullName?: string | null | undefined; email?: string | null | undefined; password?: string | null | undefined; tokenUser?: string | null | undefined; phone?: string | null | undefined; avatar?: string | null | undefined; slug?: string | null | undefined; deletedAt?: Date | null | undefined } & { _id: Types.ObjectId }) =>{
    if (!process.env.JWT_SECRET_KEY) {
        throw new Error("JWT_SECRET_KEY is not defined");
    }
    return jwt.sign(
        {id:user._id}, 
        process.env.JWT_SECRET_KEY,{
        expiresIn:"356d",
    })
}
const generateRandomNumber = (length) => {

    const charaters = "0123456789";

    let result = "";

    for (let i = 0; i < length; i++) {
        result += charaters.charAt(Math.floor(Math.random() * charaters.length));
    }

    return result;
}
export const register = async(req:Request,res:Response)=>{
    res.render("client/pages/user/register",{
        pageTitle:"Trang đăng ký",
    })
}
export const registerPost = async(req:Request, res:Response)=>{
    req.body.password = md5(req.body.password)
    const user = new User(req.body)
    await user.save()
    req.flash("success", "Đăng ký thành công")
    res.redirect("/")
}
export const login = async(req:Request, res:Response) =>{
    res.render("client/pages/user/login",{
        pageTitle:"Trang đăng nhập",
    })
}

export const loginPost = async(req:Request,res:Response)=>{
    const email = req.body.email
    const password = req.body.password
    const existUser = await User.findOne({
        email:email,
        deleted:false
    })
    if(!existUser){
        req.flash("error", "Tài khoản không tồn tại")
        return
    }
    if(md5(password) !== existUser.password){
        req.flash("error", "Sai mật khẩu")
        return
    }
    if(existUser.status === "inactive"){
        req.flash("error", "Chưa kích hoạt tài khoản")
        return
    }
    const token = generateToken(existUser);
    existUser.tokenUser = token
    res.cookie("tokenUser", token)
    existUser.save()
    res.redirect("/")
}

export const logout = async(req:Request, res:Response)=>{
    res.clearCookie("tokenUser")
    res.clearCookie("favoriteSongId")
    res.redirect("/")
}

export const info = async(req:Request, res:Response)=>{
    const user = await User.findOne({
        deleted:false,
        tokenUser:req.cookies.tokenUser
    }).select("-password")
    res.render("client/pages/user/info",{
        pageTitle: "Trang thông tin người dùng",
        user:user
    })
}

export const forgotPassword = (req:Request, res:Response)=>{
    res.render("client/pages/user/forgot-password",{
        pageTitle:"Quên mật khẩu"
    })
}
export const forgotPasswordPost = async(req:Request,res:Response)=>{
    const email = req.body.email
    const user = await User.findOne({
        email:email,
        deleted:"false"
    })
    if(!user){
        req.flash("error", "Email không tồn tại")
        res.redirect("back")
        return
    }

    const objectForgotPassword = {
        email:email,
        otp:generateRandomNumber(8),
        expiresAt:Date.now()
    }
    const forgotPassword = new ForgotPassword(objectForgotPassword)
    await forgotPassword.save()
    sendMailHelper.sendMail(email,"Mã otp xác minh lấy lại mật khẩu", `Mã otp xác minh lấy lại mật khẩu là <b>${objectForgotPassword.otp}</b>. Thời hạn sử dụng là 5 phút`)

    res.redirect(`/user/password/otp?email=${email}`)
}
export const otpPassword = (req:Request, res:Response)=>{
    const email = req.query.email
    res.render("client/pages/user/otp-password",{
        pageTitle:"Trang nhập mã otp",
        email:email
    })
}
export const otpPasswordPost = async(req:Request, res:Response) =>{
    const email = req.body.email
    const otp = req.body.otp
    const result = await ForgotPassword.findOne({
        email:email,
        otp:otp
    })
    if(!result){
        req.flash("error", "otp không hợp lệ")
        res.redirect("back")
        return
    }
    const user = await User.findOne({
        email:email
    })
    const token = generateToken(user);
    user.tokenUser = token
    res.cookie("tokenUser", token)
    user.save()
    res.redirect("/user/password/reset-password")
}

export const resetPassword = (req:Request, res:Response)=>{
    res.render("client/pages/user/reset-password",{
        pageTitle:"Trang reset mật khẩu"
    })
}
export const resetPasswordPost = async(req:Request, res:Response)=>{
    const password = req.body.password
    const tokenUser = req.cookies.tokenUser
    await User.updateOne({
        tokenUser:tokenUser
    },{
        password:md5(password)
    })
    res.redirect("/")
}
export const edit = (req:Request, res:Response)=>{
    res.render("client/pages/user/edit",{
        pageTitle:"Trang chỉnh sửa tài khoản"
    })
}
export const editPatch = async(req:Request, res:Response)=>{
    const id = res.locals.user.id;
    const emailExist = await User.findOne({
        _id:{$ne:id},
        email:req.body.email,
        deleted:false
    })
    if(emailExist){
        req.flash("error", `Email ${req.body.email} đã tồn tại`)
    }else{
        if(req.body.password){
            req.body.password = md5(req.body.password)
        }else{
            delete req.body.password
        }
        await User.updateOne({_id:id},req.body)
        req.flash("success", "Cập nhật tài khoản thành công")
    }
    res.redirect("back")
}