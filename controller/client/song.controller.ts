import { Request, Response } from "express";
import Topic from "../../model/topic.model";
import Song from "../../model/song.model";
import Singer from "../../model/singer.model";
import User from "../../model/user.model";

export const song = async (req: Request, res: Response) => {
    const topic = await Topic.findOne({
        deleted: false,
        slug: req.params.slugTopics
    })
    const songs = await Song.find({
        deleted: false,
        status: "active"
    }).select("title avatar singerId like createdAt slug")
    for (const song of songs) {
        const infoSinger = await Singer.findOne({
            deleted: false,
            _id: song.singerId
        }).select("fullName")
        song["singer"] = infoSinger
    }
    res.render("client/pages/song/list", {
        pageTitle: topic.title,
        topic: topic,
        songs: songs
    })
}
export const detail = async (req: Request, res: Response) => {
    const user = res.locals.user
    const slugSong: string = req.params.slugSong;
    const song = await Song.findOne({
        slug: slugSong,
        deleted: false,
        status: "active"
    })
    const singer = await Singer.findOne({
        _id: song.singerId,
        status: "active",
        deleted: false
    }).select("fullName")
    const topic = await Topic.findOne({
        _id: song.topicId,
        status: "active",
        deleted: false
    })
    const tmp = song.lyrics
    const regex = /\[\d{2}:\d{2}:\d{2}\]/g;
    const lrc = tmp.replace(regex,"")
    song["lrc"] = lrc
    if(user){
        song["favorite"] = user.favoriterSong ? true : false
    }
    res.render("client/pages/song/detail", {
        pageTitle: song.title,
        song: song,
        topic: topic,
        singer: singer
    })
}
export const like = async (req: Request, res: Response) => {
    const idSong = req.params.idSongs
    const typeLike = req.params.typeLike
    const song = await Song.findOne({
        deleted: false,
        status: "active",
        _id: idSong
    })
    const newLike = typeLike == "like" ? song.like + 1 : song.like - 1
    await Song.updateOne({
        _id: idSong
    }, {
        like: newLike
    })
    res.json({
        code: 200,
        message: "Thành công",
        like: newLike
    })
}

export const favorite = async (req: Request, res: Response) => {
    const idSong = req.params.idSongs
    const typeFavorite = req.params.typeFavorite
    const user = await User.findOne({
        deleted:false,
        tokenUser:req.cookies.tokenUser
    })
    switch (typeFavorite) {
        case "favorite":
            if (!user.favoriteSong.some(song => song.song_id === idSong)) {
                user.favoriteSong.push({ song_id: idSong });
                await user.save();
            }
            break;
        case "unfavorite":
            await User.updateOne(
                {
                    tokenUser:req.cookies.tokenUser,
                },{
                        $pull   :{favoriteSong:{song_id: idSong}}
                    }
                )
            break;
        default:
            break;
    }
    res.json({
        code:200,
        message: typeFavorite == "favorite" ? "Đã thêm vào yêu thích" : "Đã xóa yêu thích",
    })
}

export const listen = async (req: Request, res: Response) => {
    const idSong = req.params.idSongs
    const song = await Song.findOne({
        _id: idSong,
    })
    const listen: number = song.listen + 1
    await Song.updateOne({
        _id: idSong
    }, {
        listen: listen
    })
    const songNew = await Song.findOne({
        _id: idSong
    })
    res.json({
        code: 200,
        message: "Thành công",
        listen: song.listen
    })
}

