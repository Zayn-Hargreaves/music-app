// [GET] /admin/dashboard 
import { Request, Response } from "express"
import md5 from "md5"
import account from "../../model/accounts.model"
import Role from "../../model/roles.model"
import { systemConfig } from "../../config/congfix"
export const index = async (req:Request, res:Response) => {
    let find = {
        deleted: false
    }
    const accounts = await account.find(find).select("-password -token")
    for (const account of accounts) {
        if(account.role_id){
            const role = await Role.findOne({
                _id: account.role_id,
                deleted: false
            })
            account["role"] = role
        }
    } 
    res.render("admin/pages/accounts/index", {
        pageTitle: "Trang quản lý tài khoản",
        records: accounts
    })
}
export const create = async (req:Request, res:Response) => {
    const roles = await Role.find({ deleted: false })
    res.render("admin/pages/accounts/create", {
        pageTitle: "Trang tạo tài khoản",
        roles: roles
    })
}
export const changeStatus = async(req:Request, res:Response) =>{
    const status = req.params.status;
    const id = req.params.id;
    await account.updateOne({
        _id:id,
    },{
        status:status,
    })
    req.flash("success","cập nhật trạng thái sản phẩm thành công")
    res.redirect("back")
}

export const createPost = async (req:Request, res:Response) => {
    const emailExist = await account.findOne({
        email:req.body.email,
        deleted:false
    })
    if(emailExist){
        req.flash("error", `email ${req.body.email} đã tồn tại`)
        res.redirect("back")
    }else{
        req.body.password = md5(req.body.password);
        const records = new account(req.body);
        await records.save();
        res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
    }
}

export const edit = async (req:Request, res:Response) => {
    try {
        const find = {
            _id: req.params.id,
            deleted: false
        }
        const accounts = await account.findOne(find);
        let find1 = {
            deleted: false
        }
        const roles = await Role.find(find1)
        res.render("admin/pages/accounts/edit", {
            pageTitle: "Chỉnh sửa tài khoản",
            data: accounts,
            roles: roles
        })
    } catch (error) {
        req.flash("error", `không có tài khoản`)
        res.redirect(`/${systemConfig.prefixAdmin}/accounts`)
    }
}

export const editPatch = async(req:Request, res:Response) =>{
    const id = req.params.id
    const emailExist = await account.findOne({
        _id:{$ne :id},
        email:req.body.email,
        deleted:false
    })
    if(emailExist){
        req.flash("error", `email ${req.body.email} đã tồn tại`)
        res.redirect("back")
    }else{
        if(!req.body.avatar){
            req.body.avatar = ""
        }
        if(req.body.password){
           req.body.password = md5(req.body.password);
        }else{
            delete req.body.password
        }
        try {
            await account.updateOne({
                _id:id,
            },req.body)
            req.flash("success", `cập nhật sản phẩm thành công`)
            res.redirect("back")
        } catch (error) {
            req.flash("error", `cập nhật sản phẩm thất bại`)
            res.redirect("back")
        } 
    }
}

export const deleted = async(req:Request, res:Response)=>{
    const id = req.params.id
    await account.updateOne({
        _id:id
    },{
        deleted:true
    })
    res.redirect("back")
}