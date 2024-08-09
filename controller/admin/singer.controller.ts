import { Request,Response } from "express";
import Singer from "../../model/singer.model";
import { systemConfig } from "../../config/congfix";
export const index = async (req:Request, res:Response) =>{
    const singer = await Singer.find(
        {
            deleted:false
        }
    )
    res.render("admin/pages/singer/index",{
        pageTitle:"Quản lý ca sĩ",
        singer:singer
    })
}
export const create = async (req: Request, res: Response) => {
    res.render("admin/pages/singer/create", {
        pageTitle: "Trang tạo thông tin ca sĩ",
    })
}
export const changeStatus = async(req:Request, res:Response) =>{
    const status = req.params.status;
    const id = req.params.id;
    await Singer.updateOne({
        _id:id,
    },{
        status:status,
    })
    req.flash("success","cập nhật trạng thái sản phẩm thành công")
    res.redirect("back")
}

export const createPost = async (req: Request, res: Response) => {
    let avatar = ""
    if (req.body.avatar) {
        avatar = req.body.avatar
    }
    const object = {
        fullName: req.body.fullName,
        status: req.body.status,
        avatar: avatar,
    }
    const singer = new Singer(object)
    await singer.save()
    res.redirect(`/${systemConfig.prefixAdmin}/singers`)
}
export const edit = async (req: Request, res: Response) => {
    const id = req.params.id;
    const singer = await Singer.findOne({
        _id:id,
        deleted: false
    });
    res.render("admin/pages/singer/edit", {
        pageTitle: "Chỉnh sửa thông tin ca sĩ ",
        singer: singer,
    });
}
export const editPatch = async(req:Request, res:Response)=>{
    const id = req.params.id
    const object = {
        fullName: req.body.fullName,
        status: req.body.status,
    }
    if (req.body.avatar) {
        object["avatar"] = req.body.avatar
    }
    await Singer.updateOne({
        _id:id
    },object)
    res.redirect(`/${systemConfig.prefixAdmin}/singers`)
}
export const detail = async(req:Request,res:Response)=>{
    const id = req.params.singerId
    const singer = await Singer.findOne(
        {
            _id:id,
            deleted:false
        }
    ).select("fullName avatar status")
    res.render("admin/pages/singer/detail",{
        pageTitle:"Trang chi tiết ca sĩ",
        singer:singer,
    })
}
export const deleted = async(req:Request, res:Response)=>{
    const id = req.params.id
    await Singer.updateOne({
        _id:id
    },{
        deleted:true
    })
    res.redirect('back')
}