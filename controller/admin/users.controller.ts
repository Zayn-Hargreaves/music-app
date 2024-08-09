// [GET] /admin/dashboard 
import { Request, Response } from "express"
import md5 from "md5"
import User from "../../model/user.model"
import { systemConfig } from "../../config/congfix"
import Song from "../../model/song.model"
export const index = async (req:Request, res:Response) => {
    let find = {
        deleted: false
    }
    const accounts = await User.find(find).select("-password -token")
    res.render("admin/pages/users/index", {
        pageTitle: "Trang quản lý tài khoản",
        records:accounts
    })
}
export const changeStatus = async(req:Request, res:Response) =>{
    const status = req.params.status;
    const id = req.params.id;
    await User.updateOne({
        _id:id,
    },{
        status:status,
    })
    req.flash("success","cập nhật trạng thái sản phẩm thành công")
    res.redirect("back")
}

export const detail = async(req:Request, res:Response)=>{
    const id = req.params.id
    const account = await User.findOne({
        _id:id,
        deleted:false
    }).select("-tokenUser -password")
    res.render("admin/pages/users/detail",{
        pageTitle: "Thông tin tài khoản",
        records:account
    })
}
export const deleted = async(req:Request, res:Response)=>{
    const id = req.params.id
    await User.updateOne({
        _id:id
    },{
        deleted:true
    })
    res.redirect("back")
}