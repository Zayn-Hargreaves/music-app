import { Request,Response } from "express";
import Topic from "../../model/topic.model";
import { systemConfig } from "../../config/congfix";
import * as createTreeHelper from "../../helper/createTree"
export const index = async (req:Request, res:Response) =>{
    const topic = await Topic.find({
        deleted:false
    })
    res.render("admin/pages/topic/index",{
        pageTitle:"Quản lý chủ đề bài hát",
        topics:topic
    })
}
export const changeStatus = async(req:Request, res:Response) =>{
    const status = req.params.status;
    const id = req.params.id;
    await Topic.updateOne({
        _id:id,
    },{
        status:status,
    })
    req.flash("success","cập nhật trạng thái sản phẩm thành công")
    res.redirect("back")
}
export const create = async (req: Request, res: Response) => {
    const records = await Topic.find({
        deleted: false
    })
    const parentTopics = createTreeHelper.tree(records)
    res.render("admin/pages/topic/create", {
        pageTitle: "Trang tạo chủ đề bài hát",
        parentTopics: parentTopics,
    })
}
export const createPost = async (req: Request, res: Response) => {
    let avatar = ""
    if (req.body.avatar) {
        avatar = req.body.avatar
    }
    const object = {
        title: req.body.title,
        topicId: req.body.topicId,
        parent_id:req.body.parentId,
        description: req.body.description,
        status: req.body.status,
        avatar: avatar,
    }
    const topic = new Topic(object)
    await topic.save()
    res.redirect(`/${systemConfig.prefixAdmin}/topics`)
}
export const edit = async (req: Request, res: Response) => {
    const id = req.params.id;
    const topic = await Topic.findOne({
        _id:id,
        deleted: false
    });
    const records = await Topic.find({
        deleted: false
    })
    const parentTopics = createTreeHelper.tree(records)
    res.render("admin/pages/topic/edit", {
        pageTitle: "Chỉnh sửa chủ đề ",
        topic: topic,
        parentTopics:parentTopics
    });
}
export const editPatch = async(req:Request, res:Response)=>{
    const object = {
        title: req.body.title,
        parent_id: req.body.topicId,
        description: req.body.description,
        status: req.body.status,
    }
    if (req.body.avatar) {
        object["avatar"] = req.body.avatar[0]
    }
    await Topic.updateOne({
        _id:req.params.id
    },object)
    res.redirect("back")
}
export const detail = async(req:Request,res:Response)=>{
    const id = req.params.topicId
    const topic = await Topic.findOne(
        {
            _id:id,
            deleted:false
        }
    )
    if(topic.parent_id){
        const parentInfo = await Topic.findOne(
        {
            deleted:false,
            _id:topic.parent_id
            }
        )
        topic["parentTitle"] = parentInfo
    }
    res.render("admin/pages/topic/detail",{
        pageTitle:"Trang chi tiết chủ đề",
        topic:topic,
    })
}
export const deleted = async(req:Request, res:Response)=>{
    const id = req.params.id
    await Topic.updateOne({
        _id:id
    },{
        deleted:true
    })
    const topic = await Topic.findOne({
        _id:id
    })
    res.redirect('back')
}