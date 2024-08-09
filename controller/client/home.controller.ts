import Topic from "../../model/topic.model"
import Song from "../../model/song.model";
import { Request, Response } from "express";
import Singer from "../../model/singer.model";

export const index = async(req:Request, res:Response)=>{
    const topic = await Topic.find({
        deleted:false
    })
    const likeSong = await Song.find({deleted:false}).sort({like:"desc"}).select("title avatar singerId like createdAt slug")
    const listenSong = await Song.find({deleted:false}).sort({listen:"desc"}).select("title avatar singerId like createdAt slug")
    for (const song of listenSong) {
        const infoSinger = await Singer.findOne({
            deleted: false,
            _id: song.singerId
        }).select("fullName")
        song["singer"] = infoSinger
    }
    for (const song of likeSong) {
        const infoSinger = await Singer.findOne({
            deleted: false,
            _id: song.singerId
        }).select("fullName")
        song["singer"] = infoSinger
    }
    // console.log(listenSong)
    res.render("client/pages/home/index", {
        pageTitle: "Trang chủ",
        topics: topic,
        initialTopics: topic.slice(0, 3),
        listenSong:listenSong.slice(0,10),
        likeSong:likeSong.slice(0,10),
      });
}