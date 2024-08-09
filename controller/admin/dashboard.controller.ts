import { Request, Response } from "express"
import Topic from "../../model/topic.model"
import Song from "../../model/song.model"
import account from "../../model/accounts.model"
import User from "../../model/user.model"
import Singer from "../../model/singer.model"
// [GET] /admin/dashboard 
export const index = async(req:Request, res:Response) =>{
    const staticc = {
        topic:{
            total:0,
            active:0,
            inactive:0,
        },
        song:{
            total:0,
            active:0,
            inactive:0,
        },
        singer:{
            total:0,
            active:0,
            inactive:0,
        },
        account:{
            total:0,
            active:0,
            inactive:0,
        },
        user:{
            total:0,
            active:0,
            inactive:0,
        }
    }
    staticc.topic.total = await Topic.countDocuments({
        deleted:false,
    })
    staticc.topic.active = await Topic.countDocuments({
        deleted:false,
        status:"active"
    })
    staticc.topic.inactive = await Topic.countDocuments({
        deleted:false,
        status:"inactive"
    })

    staticc.song.total = await Song.countDocuments({
        deleted:false,
    })
    staticc.song.active = await Song.countDocuments({
        deleted:false,
        status:"active"
    })
    staticc.song.inactive = await Song.countDocuments({
        deleted:false,
        status:"inactive"
    })

    staticc.account.total = await account.countDocuments({
        deleted:false,
    })
    staticc.account.active = await account.countDocuments({
        deleted:false,
        status:"active"
    })
    staticc.account.inactive = await account.countDocuments({
        deleted:false,
        status:"inactive"
    })

    staticc.user.total = await User.countDocuments({
        deleted:false,
    })
    staticc.user.active = await User.countDocuments({
        deleted:false,
        status:"active"
    })
    staticc.user.inactive = await User.countDocuments({
        deleted:false,
        status:"inactive"
    })
    staticc.singer.total = await Singer.countDocuments({
        deleted:false,
    })
    staticc.singer.active = await Singer.countDocuments({
        deleted:false,
        status:"active"
    })
    staticc.singer.inactive = await Singer.countDocuments({
        deleted:false,
        status:"inactive"
    })
    res.render("admin/pages/dashboard/index",{
        pageTitle: "Trang tổng quan",
        statistic:staticc
    })
}