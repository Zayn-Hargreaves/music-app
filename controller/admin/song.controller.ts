import { Request, Response } from "express";
import Song from "../../model/song.model";
import Topic from "../../model/topic.model";
import Singer from "../../model/singer.model";
import { systemConfig } from "../../config/congfix";
import * as createTreeHelper from "../../helper/createTree"
export const index = async (req: Request, res: Response) => {
    const songs = await Song.find({
        deleted: false
    })
    for (const song of songs) {
        const infoSinger = await Singer.findOne({
            deleted:false,
            _id:song.singerId
        }).select("fullName")
        const infoTopic = await Topic.findOne({
            deleted:false,
            _id:song.topicId
        })
        song["singer"] = infoSinger
        song["topic"] = infoTopic
    }
    res.render("admin/pages/song/index", {
        pageTitle: "Quản lý bài hát",
        songs: songs
    })
}
export const changeStatus = async(req:Request, res:Response) =>{
    const status = req.params.status;
    const id = req.params.id;
    await Song.updateOne({
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
    const topics = createTreeHelper.tree(records)
    const singers = await Singer.find({
        deleted: false
    }).select("fullName")
    res.render("admin/pages/song/create", {
        pageTitle: "Trang tạo bài hát",
        topics: topics,
        singers: singers
    })
}

export const createPost = async (req: Request, res: Response) => {
    let avatar = ""
    let audio = ''
    if (req.body.avatar) {
        avatar = req.body.avatar
    }
    if (req.body.audio) {
        avatar = req.body.audio
    }
    const object = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        avatar: avatar,
        lyrics: req.body.lyrics,
        audio: audio
    }
    const song = new Song(object)
    await song.save()
    res.redirect(`/${systemConfig.prefixAdmin}/songs`)
}

export const edit = async (req: Request, res: Response) => {
    const id = req.params.id;

    const song = await Song.findOne({
        _id: id,
        deleted: false
    });

    const records = await Topic.find({
        deleted: false
    })
    const topics = createTreeHelper.tree(records)
    const singers = await Singer.find({
        deleted: false
    }).select("fullName");

    res.render("admin/pages/song/edit", {
        pageTitle: "Chỉnh sửa bài hát",
        song: song,
        topics: topics,
        singers: singers
    });
}
export const editPatch = async(req:Request, res:Response)=>{
    const object = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        lyrics: req.body.lyrics,

    }
    if (req.body.avatar) {
        object["avatar"] = req.body.avatar
    }
    if (req.body.audio) {
        object['audio'] = req.body.audio
    }
    await Song.updateOne({
        _id:req.params.id
    },object)
    res.redirect("back")
}
export const detail = async(req:Request,res:Response)=>{
    const id = req.params.songId
    const song = await Song.findOne(
        {
            _id:id,
            deleted:false
        }
    )
    const topics = await Topic.findOne({
        _id:song.topicId,
        deleted: false
    }).select("title");
    const singers = await Singer.findOne({
        _id:song.singerId,
        deleted: false
    }).select("fullName");
    res.render("admin/pages/song/detail",{
        pageTitle:"Trang chi tiết bài hát",
        song:song,
        topics:topics,
        singers:singers
    })
}
export const deleted = async(req:Request, res:Response)=>{
    const id = req.params.id
    await Song.updateOne({
        _id:id
    },{
        deleted:true
    })
    res.redirect("back")
}