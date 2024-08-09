import { Request, Response } from "express";
import Song from "../../model/song.model";
import Singer from "../../model/singer.model";
import unidecode from "unidecode"
export const result = async (req: Request, res: Response) => {
    const keyword: string = `${req.query.keyword}`
    const type :string = req.params.type
    let newSongs = []
    if (keyword) {
        const keyword: string = `${req.query.keyword}`;

        const unidecodeText: string = unidecode(keyword);
        const keywordSlug = unidecodeText.replace(/\s+/g, "-");
        const keyWordSlugRegex = new RegExp(keywordSlug, "i");

        const keyWordRegex = new RegExp(keyword, "i");
        const songs = await Song.find({
            $or: [
                { title: keyWordSlugRegex},
                { slug: keyWordRegex }
            ]
        })
        if (songs.length > 0) {
            for (const song of songs) {
                const infoSinger = await Singer.findOne({
                    _id: song.singerId
                })
                newSongs.push({
                    title:song.title,
                    avatar:song.avatar,
                    slug:song.slug,
                    like:song.like,
                    infoSinger:{
                        fullName:infoSinger.fullName
                    }
                })
            }
        }
    }
    switch (type) {
        case "result":
            res.render("client/pages/search/result", {
                pageTitle: `Kết quả ${keyword}`,
                keyword: keyword,
                songs: newSongs
            })
            break;
        case "suggest":
            res.json({
                code:200,
                message:"Thành công",
                songs:newSongs
            })
            break;
        default:
            res.json({
                code:400,
                message:"Lỗi"
            })
            break;
    }
}