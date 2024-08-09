import { Request, Response } from "express"
import User from "../../model/user.model"
import Song from "../../model/song.model"
import Singer from "../../model/singer.model"

export const index = async(req:Request, res:Response)=>{
    const user = await User.findOne({
        deleted:false,
        tokenUser:req.cookies.tokenUser
    })
    const favoriteSongId = user.favoriteSong.map( item => item.song_id)
    const favoriteSong = await Song.find({
        _id: { $in: favoriteSongId },
        status: "active",
        deleted: false
    })
    for (const song of favoriteSong) {
        const infoSinger = await Singer.findOne({
            _id: song.singerId
        })
        song["singer"] = infoSinger
    }
    res.render("client/pages/song/favorite.pug", {
        pageTitle: "Bài hát yêu thích",
        favoriteSongs: favoriteSong
    })
}