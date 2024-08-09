import { Request,Response } from "express";
import role from "../../model/roles.model";
import { systemConfig } from "../../config/congfix";
export const index = async (req:Request, res:Response) =>{
    const records = await role.find({
        deleted:false
    })
    res.render("admin/pages/roles/index",{
        pageTitle:"Trang phân quyền",
        records:records
    })
}

export const create = async (req:Request, res:Response) => {
    let find = {
        deleted: false
    }
    const records = await role.find(find)
    res.render("admin/pages/roles/create", {
        pageTitle: "Trang tạo nhóm quyền ",
        records: records
    })
}
export const createPost = async (req:Request, res:Response) => {
    const records = new role(req.body)
    await records.save()
    res.redirect(`/${systemConfig.prefixAdmin}/roles`)
}
export const edit = async (req:Request, res:Response) => {
    try {
        const id = req.params.id
        let find = {
            _id: id,
            deleted: false
        }
        const data = await role.findOne(find)
        res.render("admin/pages/roles/edit", {
            pageTitle: "sua nhom quyen",
            data: data
        })
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/roles`)
    }
}
export const editPatch = async (req:Request, res:Response) => {
    try {
        const id = req.params.id
        await role.updateOne({ _id: id }, req.body)
        req.flash("success", "cap nhat thanh cong")
    } catch (error) {
        req.flash("error", "cap nhat that bai")
        res.redirect("back")
    }
}
//[delete] /admin/roles/delete/:id
export const deleteItem = async (req:Request, res:Response) => {
    const id = req.params.id;
    await role.updateOne({ _id: id }, { deleted: true, deleteAt: new Date() });
    req.flash("success", `đã xoá thành công`)
    res.redirect("back")
}
export const permissions = async (req:Request, res:Response) => {
    let find = {
        deleted: false
    }
    const records = await role.find(find)
    res.render("admin/pages/roles/permissions", {
        pageTitle: "Trang phân quyền",
        records: records
    })
}
export const permissionsPatch = async (req:Request, res:Response) => {
    try {
        const permissions = JSON.parse(req.body.permissions)
        for (const item of permissions) {
            await role.updateOne({ _id: item.id }, { permissions: item.permissions })
        }
        req.flash("success", "cap nhat thanh cong")
        res.redirect('back')
    } catch (error) {
        req.flash("error","cap nhat that bai")
    }

}